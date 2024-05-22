import Copyright from '../../../components/Footer/Copyright';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { vendor_Signup } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

export default function VendorSignup() {
  // Method to change location
  const navigate = useNavigate();

  // Error & Alert States
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // On first render, check if user is logged in.If so, send to their profile page
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate(`/profile`);
    }
  }, []);

  // Initialize State for form fields
  const [formState, setFormState] = useState({
    vendorName: '',
    email: '',
    password: '',
  });

  //  Mutation
  const [AddVendor, { error, loading, data }] = useMutation(vendor_Signup);

  // OnChange, update form state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // On form Submission:
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous error message

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setErrorMessage('Invalid email address');
    }

    if (formState.password.length < 8) {
      setErrorMessage(
        (prevMessage) =>
          prevMessage + ' Password must be at least 8 characters long'
      );
    }

    if (!emailRegex.test(formState.email) && formState.password.length < 8) {
      setErrorMessage('The email address is invalid, and your password must be at least 8 characters long')
    }

    if (errorMessage) {
      setShowErrorAlert(true);
      return;
    }

    try {
      const { data } = await AddVendor({
        variables: { ...formState },
      });
      console.log('Vendor data structure:', JSON.stringify(data));
      Auth.login(data.AddVendor.token);
      setShowSuccessAlert(true);
      setTimeout(() => {
        navigate(`/profile`);
      }, 1500);
    } catch (e) {
      console.log('Vendor data structure:', JSON.stringify(data));
      setShowErrorAlert(true);
      console.error('AddVendor Error:', e);
    }
  };

  // Clear error message once message is closed (onClose)
  const handleClearError = () => {
    setErrorMessage('');
    setShowErrorAlert(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 18,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {showSuccessAlert && (
          <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
            Registration successful! Redirecting to profile...
          </Alert>
        )}
        {showErrorAlert && (
          <Alert
            severity='error'
            sx={{ width: '100%', mb: 2 }}
            onClose={handleClearError}
          >
            {errorMessage ||
              'Please complete the form, or try a different email address'}
          </Alert>
        )}
        <Avatar sx={{ marginBottom: 3, bgcolor: 'primary.main' }}>
          <StorefrontIcon />
        </Avatar>
        <Typography variant='h5'>Vendor Registration</Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id='vendorName'
                label='Vendor Name'
                name='vendorName'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            sx={{
              mt: 3,
              mb: 2,
              textTransform: 'none',
              color: 'primary.main',
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                href='/signin/vendor'
                variant='body2'
                sx={{ textDecoration: 'none' }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
