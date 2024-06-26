import {
  Container,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import { Vendor } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';

// Column Data
const columns = [
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
    field: 'fullName',
    headerName: 'Description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

// Row Data
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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

  console.log('vendor data: ', data);

  return (
    <Container maxWidth='xl'>
      <Box marginTop={14}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
        />
      </Box>
    </Container>
  );
}
