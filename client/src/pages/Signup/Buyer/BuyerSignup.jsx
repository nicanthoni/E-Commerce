import Copyright from '../../../components/Footer/Copyright';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useBuyerSignup } from '../../../hooks/Signup/useBuyerSignup';
import { useAuthContext } from '../../../hooks/useAuthContext';
import SignupAlert from '../../../components/Alerts/Auth/Signup';


export default function BuyerSignup() {
  const { user } = useAuthContext();
  const { signup, stateError, isLoading } = useBuyerSignup(); // custom hook
  const navigate = useNavigate();

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showSignupAlert, setShowSignupAlert] = useState(false);

  // Form state
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
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
      console.error('signup() error in BuyerSignup:', e);
      setAlertMessage('An error occurred during signup. Please try again later.');
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
          <ShoppingBasketIcon />
        </Avatar>
        <Typography variant='h5'>Buyer Registration</Typography>

        {/* FORM */}
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                onChange={handleChange}
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
                href='/signin/buyer'
                variant='body2'
                align='center'
                sx={{ textDecoration: 'none' }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* ⚠️ Alert ⚠️ */}
      <SignupAlert visible={showSignupAlert} message={alertMessage} />
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
