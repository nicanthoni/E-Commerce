import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UploadButton from '../../../components/Buttons/UploadButton';

// Page for Vendors to add a new product for sale by using the AddItemForm component
export default function UploadItem() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      vendor: data.get('vendor'),
      product: data.get('product'),
      description: data.get('description'),
      price: data.get('price'),
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Upload image */}
        <Box margin={3}>
          <UploadButton />
        </Box>

        {/* Form */}
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent='center'>
            {/* Vendors Name */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='vendorName'
                label='Vendor Name'
                name='vendor'
              />
            </Grid>

            {/* Vendors Product */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='vendorProductName'
                label='Product Name'
                name='product'
              />
            </Grid>

            {/* Product Description */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='description'
                label='Product Description'
                id='vendorProductDescription'
              />
            </Grid>

            {/* $ Product Price $ */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='price'
                label='Price'
                id='vendorProductPrice'
              />
            </Grid>

            {/* Submit Button */}
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                sx={{
                  color: 'primary.main',
                  textTransform: 'none',
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
