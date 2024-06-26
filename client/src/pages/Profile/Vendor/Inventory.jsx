import {
  Container,
  Typography,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import { Vendor } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Inventory() {
  // Auth context
  const { user, id, type } = useAuthContext();

  // States
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Query - Vendor data
  const { loading, error, data } = useQuery(Vendor, {
    variables: { vendorId: id },
  });

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress />;

  // Show error if there's an error fetching data
  if (error) return <Typography>Error! {error.message}</Typography>;

  // Map the fetched data to DataGrid rows
  const rows = data.vendor.inventory.map((item, index) => ({
    id: item._id,
    firstName: item.name,
    lastName: item.category,
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

  // Handle checkbox selection change
  const handleSelectionModelChange = (newSelection) => {
    setSelectedItems(newSelection.selectionModel);
    console.log('Selected items:', newSelection.selectionModel);

    // Log the _id of the selected rows
    newSelection.selectionModel.forEach((selectedId) => {
      const selectedRow = rows.find((row) => row.id === selectedId);
      if (selectedRow) {
        console.log('Selected row ID:', selectedRow.id);
        // Perform actions with selectedRow.id as needed
      }
    });

    setShowDeleteIcon(true); // Show delete icon when items are selected
  };

  // Handle row click event (optional, for row click)
  const handleRowClick = (params) => {
    console.log('Clicked row ID:', params.row.id);
    // Do something with the clicked row ID
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  return (
    <Container maxWidth='lg'>
      {/* {showDeleteIcon && (
        <IconButton onClick={handleDelete}>
          <DeleteForeverIcon />
        </IconButton>
      )} */}
      <Box marginTop={14}>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'firstName', headerName: 'Item', width: 130 },
            { field: 'lastName', headerName: 'Category', width: 130 },
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
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          selectionModel={selectedItems}
          onSelectionModelChange={handleSelectionModelChange} // Handle checkbox selection change
          onRowClick={handleRowClick} // Handle row click event
        />
      </Box>
    </Container>
  );
}
