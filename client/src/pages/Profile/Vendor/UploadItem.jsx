import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Vendor } from '../../../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { Stack } from '@mui/material';
import { categories, quantities } from '../../../data/itemData';
import MenuItem from '@mui/material/MenuItem';
import { Paper } from '@mui/material';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';

export default function UploadItem() {
  // Auth
  const { user, id: vendorId } = useAuthContext();

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showUploadAlert, setShowUploadAlert] = useState(false);

  // Query - vendor data
  const [
    loadVendor,
    { loading: vendorLoading, data: vendorData, error: vendorError },
  ] = useLazyQuery(Vendor, {
    variables: { vendorId: vendorId },
  });

  // Form state
  const [formState, setFormState] = useState({
    item: '', // item name
    price: '', // item price
    description: '', // item description
    category: '', // item category
    inventory: '', // items inventory count
    uploaded_item: null, // item img file object
  });

  // Effect: Load vendor data
  useEffect(() => {
    if (user) {
      loadVendor();
    }
  }, [loadVendor, user]);

  // OnChange - update form state
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    // Check if the input field is the file input
    if (name === 'uploaded_item') {
      const file = files[0];
      if (file) {
        setFormState({
          ...formState,
          uploaded_item: file,
        });
      }
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  // onSubmit - handle new item submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty input fields
    const { item, price, inventory, description, category, uploaded_item } =
      formState;
    if (
      !item ||
      !price ||
      !inventory ||
      !description ||
      !category ||
      !uploaded_item
    ) {
      setAlertMessage('Please complete all fields');
      setShowUploadAlert(true);
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 1500);
      return;
    }

    console.log('formState: ', formState);

    // Prepare FormData to send to backend
    const formData = new FormData();
    formData.append('vendorId', vendorId);
    formData.append('name', formState.item);
    formData.append('price', formState.price);
    formData.append('description', formState.description);
    formData.append('category', formState.category);
    formData.append('inventory', formState.inventory);
    formData.append('file', formState.uploaded_item);

    try {
      // Make POST request to backend endpoint using fetch
      const response = await fetch('http://localhost:3001/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload item');
      }

      const responseData = await response.json();
      console.log('Item uploaded successfully:', responseData);
      setAlertMessage('Added');
      setShowUploadAlert(true);
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 1500);
    } catch (error) {
      console.error('Error: ', error);
      setAlertMessage('Upload Error');
      setShowUploadAlert(true);
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 1500);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper
        elevation={2}
        component='form'
        encType='multipart/form-data'
        noValidate
        onSubmit={handleSubmit}
        sx={{
          // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', // Change the RGBA color to your desired shadow color
          marginTop: 15,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Form */}
        <Grid container spacing={2} justifyContent='center'>
          {/* Upload img */}
          <Grid item>
            <input
              type='file'
              accept='image/*'
              onChange={handleChange}
              name='uploaded_item'
            />
          </Grid>

          {/* Item name */}
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              required
              fullWidth
              id='vendorItemName'
              label='Item Name'
              name='item'
            />
          </Grid>

          {/* Item Description */}
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              required
              fullWidth
              name='description'
              label='Item Description'
              id='vendorItemDescription'
            />
          </Grid>

          {/* Item Price $ */}
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              required
              fullWidth
              name='price'
              label='Price'
              id='vendorItemPrice'
            />
          </Grid>

          {/* Item Category */}
          <Grid item xs={12}>
            <Stack direction='row' justifyContent='space-around'>
              <TextField
                onChange={handleChange}
                select
                required
                id='vendorItemCategory'
                name='category'
                label='Category'
                helperText={'Category of item'}
              >
                {categories.slice(1).map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Inventory # */}
              <TextField
                onChange={handleChange}
                select
                required
                id='vendorItemInventory'
                name='inventory'
                label='Inventory'
                helperText={'Quantity of item'}
              >
                {quantities.map((quantity) => (
                  <MenuItem key={quantity} value={quantity}>
                    {quantity}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
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
      </Paper>

      {/* ⚠️ Alert ⚠️ */}
      <ItemAlert visible={showUploadAlert} message={alertMessage} />
    </Container>
  );
}
