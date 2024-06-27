import {
  Container,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { delete_Item } from '../../../graphql/mutations';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@apollo/client';
import { Vendor } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';

export default function Inventory() {
  // Auth context
  const { id: vendorId } = useAuthContext();

  // States
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null); // stores itemId
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); //  confirmation prompt
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
  const { loading, error, data, refetch } = useQuery(Vendor, {
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

  // onClick - show item deletion confirmation
  const handleConfirmation = (itemId) => {
    setItemToDelete(itemId);
    setDeleteConfirmation(true);
  };

  // onClose - close confirmation
  const handleClose = () => {
    setDeleteConfirmation(false);
    setItemToDelete(null);
  };

  // onClick - handle item deletion
  const handleDelete = async () => {
    console.log('Item clicked: ', itemToDelete);
    try {
      await deleteItem({ variables: { itemId: itemToDelete, vendorId } });
      console.log(`Item ${itemToDelete} deleted`);
      setAlertMessage('Removed');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        refetch(); // refetch data after item deletion
      }, 1000);
    } catch (e) {
      console.log('Error: ', e);
    }
    handleClose();
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
                  icon={<DeleteForeverIcon color='error' />}
                  label='Delete'
                  // onClick={() => handleDelete(params.id)}
                  onClick={() => handleConfirmation(params.id)}
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

      {/* Deletion Confirmation */}
      <Dialog open={deleteConfirmation} onClose={handleClose}>
        <DialogTitle>{'Delete item and associated data?'}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            By deleting an item from your inventory, you will be removing it
            from the shop and deleting its associated data. This cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant='contained'
            color='grey'
            onClick={handleClose}
            sx={{
              textTransform: 'none',
              backgroundColor: 'white',
              color: 'primary.main',
            }}
          >
            Nevermind
          </Button>

          <Button
            variant='contained'
            onClick={handleDelete}
            color='error'
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ⚠️ Alerts ⚠️ */}
      <ItemAlert visible={showAlert} message={alertMessage} />
    </Container>
  );
}
