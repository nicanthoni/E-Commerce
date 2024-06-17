import Copyright from '../../../components/Footer/Copyright';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useVendorSignup } from '../../../hooks/Signup/useVendorSignup';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AuthAlert from '../../../components/Alerts/Auth/AuthAlert';


export default function VendorSignup() {
  const { user } = useAuthContext();
  const { signup, stateError, isLoading } = useVendorSignup(); // custom hook
  const navigate = useNavigate();

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showSignupAlert, setShowSignupAlert] = useState(false);

  // Form state
  const [formState, setFormState] = useState({
    vendorName: '',
    email: '',
    password: '',
  });

  // On render, check if logged in => Send to profile page
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, []);

  // OnChange - update form state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // OnSubmit - validation check + run signup() hook
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSignupAlert(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check for empty input fields
    const { vendorName, email, password } = formState;
    if (!vendorName || !email || !password) {
      setAlertMessage('Please complete all fields');
      setShowSignupAlert(true);
      setTimeout(() => {
        setShowSignupAlert(false);
      }, 1500);
      return;
    }

    // Check if both email and password are invalid
    if (!emailRegex.test(formState.email) && formState.password.length < 8) {
      setAlertMessage('Invalid email, and password less than 8 characters');
      setShowSignupAlert(true);
      setTimeout(() => {
        setShowSignupAlert(false);
      }, 1500);
      return;
    }
    // Check if email is invalid
    if (!emailRegex.test(formState.email)) {
      setAlertMessage('Invalid email address');
      setShowSignupAlert(true);
      setTimeout(() => {
        setShowSignupAlert(false);
      }, 1500);
      return;
    }
    // Check if password is too short
    if (formState.password.length < 8) {
      setAlertMessage('Password must be at least 8 characters');
      setShowSignupAlert(true);
      setTimeout(() => {
        setShowSignupAlert(false);
      }, 1500);
      return;
    }

    try {
      const success = await signup(formState);
      if (success) {
        setAlertMessage('Registration Successful.');
        setShowSignupAlert(true);
        setTimeout(() => {
          navigate('/profile');
          setShowSignupAlert(false);
        }, 1500);
      } else {
        // Handle any other cases if needed
        setAlertMessage('Registration failed. Please try again.');
        setShowSignupAlert(true);
        setTimeout(() => {
          setShowSignupAlert(false);
        }, 1500);
      }
    } catch (e) {
      console.error('signup() error in VendorSignup:', e);
      setAlertMessage(
        'An error occurred during signup. Please try again later.'
      );
      setShowSignupAlert(true);
      setTimeout(() => {
        setShowSignupAlert(false);
      }, 1500);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ marginBottom: 3, bgcolor: 'primary.main' }}>
          <StorefrontIcon />
        </Avatar>
        <Typography variant='h5'>Vendor Registration</Typography>

        {/* FORM */}
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

      {/* ⚠️ Alert ⚠️ */}
      <AuthAlert visible={showSignupAlert} message={alertMessage} />

      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
