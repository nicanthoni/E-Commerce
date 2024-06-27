import {
  Container,
  Typography,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { delete_Item } from '../../../graphql/mutations';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@apollo/client';
import { Vendor } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Inventory() {
  // Auth context
  const { id: vendorId } = useAuthContext();

  // States
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Mutation - delete item
  const [
    deleteItem,
    {
      loading: deleteItemLoading,
      error: deleteItemError,
      data: deleteItemData,
    },
  ] = useMutation(delete_Item);

  // Query - Vendor data
  const { loading, error, data } = useQuery(Vendor, {
    variables: { vendorId },
  });

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress />;

  // Show error if there's an error fetching data
  if (error) return <Typography>Error! {error.message}</Typography>;

  // Map the fetched data to DataGrid rows
  const rows = data.vendor.inventory.map((item, index) => ({
    id: item._id,
    itemName: item.name,
    category: item.category,
    units: item.inventory,
    price: `$${item.price}`,
    inCart: item.inCart,
    dateCreated: new Date(parseInt(item.createdAt)), // Convert createdAt to Date object
    description: item.description,
    rating:
      item.ratings.length && item.ratings[0].stars !== null
        ? item.ratings[0].stars
        : 'N/A',
  }));

  // onClick - handle item deletion
  const handleDelete = async (itemId) => {
    console.log('Item clicked: ', itemId);
    try {
      await deleteItem({ variables: { itemId, vendorId } });
      console.log(`Item ${itemId} deleted`)
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <Container maxWidth='lg'>
      <Box marginTop={14}>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'id', headerName: 'ID', width: 80 },
            { field: 'itemName', headerName: 'Item', width: 130 },
            { field: 'category', headerName: 'Category', width: 130 },
            { field: 'price', headerName: 'Price', type: 'number', width: 80 },
            { field: 'units', headerName: 'Units', type: 'number', width: 65 },
            {
              field: 'inCart',
              headerName: 'InCart',
              type: 'number',
              width: 65,
            },
            {
              field: 'rating',
              headerName: 'Rating',
              type: 'number',
              width: 65,
            },
            {
              field: 'dateCreated',
              headerName: 'Created',
              type: 'date',
              width: 87,
            },
            {
              field: 'description',
              headerName: 'Description',
              description:
                'This column has a value getter and is not sortable.',
              sortable: false,
              width: 160,
            },
            {
              field: 'actions',
              type: 'actions',
              width: 80,
              getActions: (params) => [
                <GridActionsCellItem
                  key={params.id}
                  icon={<DeleteForeverIcon sx={{ color: 'secondary.main' }} />}
                  label='Delete'
                  onClick={() => handleDelete(params.id)}
                />,
              ],
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          selectionModel={selectedRows}
        />
      </Box>
    </Container>
  );
}
