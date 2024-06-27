import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { delete_Item } from '../../../graphql/mutations';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@apollo/client';
import { Vendor } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState } from 'react';
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

  // If loading
  if (loading) return <CircularProgress />;

  // If error
  if (error) return <Typography>Error! {error.message}</Typography>;

  // Data grid rows
  const rows = data.vendor.inventory.map((item) => ({
    id: item._id,
    itemName: item.name,
    category: item.category,
    units: item.inventory,
    price: `$${item.price}`,
    inCart: item.inCart,
    dateCreated: new Date(parseInt(item.createdAt)), // Convert createdAt to Date object
    rating:
      item.ratings.length && item.ratings[0].stars !== null
        ? item.ratings[0].stars
        : 'N/A',
  }));

  // Dat grid columns
  const columns = [
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
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) =>
        selectedRows.includes(params.id)
          ? [
              <GridActionsCellItem
                key={params.id}
                icon={<DeleteForeverIcon color='error' />}
                label='Delete'
                onClick={() => handleConfirmation(params.id)}
              />,
            ]
          : [],
    },
  ];

  // On checkbox selection - show delete icon
  const onRowSelection = (selectionModel) => {
    setSelectedRows(selectionModel);
    console.log('selected rows: ', selectionModel)
  };

  // onClick of delete icon - show delete confirmation
  const handleConfirmation = (itemId) => {
    setItemToDelete(itemId);
    setDeleteConfirmation(true);
  };

  // onClose - close confirmation window
  const handleClose = () => {
    setDeleteConfirmation(false);
    setItemToDelete(null);
  };

  // onClick of delete confirmation - handle item deletion
  const handleDelete = async () => {
    try {
      await deleteItem({ variables: { itemId: itemToDelete, vendorId } });
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
    <Container maxWidth='md'>
      <Box marginTop={14}>
        {/* Data grid */}
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) =>
            onRowSelection(newSelection)
          }
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
