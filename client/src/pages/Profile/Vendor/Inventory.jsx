import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import { Vendor } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function Inventory() {
  // Auth context
  const { user, id, type } = useAuthContext();

  // Query - Vendor data
  const { loading, error, data } = useQuery(Vendor, {
    variables: { vendorId: id },
  });

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress />;

  // Show error if there's an error fetching data
  if (error) return <Typography>Error! {error.message}</Typography>;

  console.log('Vendor Inventory: ', data.vendor.inventory);

  // Map the fetched data to DataGrid rows
  const rows = data.vendor.inventory.map((item, index) => ({
    id: item._id,
    firstName: item.name,
    lastName: item.category,
    age: item.inventory,
    price: item.price,
    inCart: item.inCart,
    dateCreated: new Date(parseInt(item.createdAt)), // Convert createdAt to Date object
    description: item.description,
    rating: item.ratings.length && item.ratings[0].stars !== null ? item.ratings[0].stars : 'N/A', 
  }));

  return (
    <Container maxWidth='xl'>
      <Box marginTop={14}>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'Item', width: 130 },
            { field: 'lastName', headerName: 'Category', width: 130 },
            {
              field: 'age',
              headerName: 'Inventory',
              type: 'number',
              width: 90,
            },
            {
              field: 'price',
              headerName: 'Price',
              type: 'number',
              width: 90,
            },
            {
              field: 'rating',
              headerName: 'Rating',
              type: 'number',
              width: 90,
            },
            {
              field: 'inCart',
              headerName: 'In Carts',
              type: 'number',
              width: 90,
            },
            {
              field: 'dateCreated',
              headerName: 'Date created',
              type: 'date',
              width: 90,
            },
            {
              field: 'description',
              headerName: 'Description',
              description: 'This column has a value getter and is not sortable.',
              sortable: false,
              width: 160,
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
        />
      </Box>
    </Container>
  );
}
