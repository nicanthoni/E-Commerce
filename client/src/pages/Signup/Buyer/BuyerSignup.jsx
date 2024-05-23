import Copyright from '../../../components/Footer/Copyright';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSignup } from '../../../hooks/useSignup'; 
import { useAuthContext } from '../../../hooks/useAuthContext';


export default function BuyerSignup() {
  const { user } = useAuthContext()
  const {signup, stateError, isLoading} = useSignup() // custom hook
  const navigate = useNavigate()

  // Error & Alert States
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    // onClose - clear error message 
    const handleClearError = () => {
      setErrorMessage('');
      setShowErrorAlert(false);
    };

  // OnSubmit - validation check + run signup() hook
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
      // console.log('Signup Form state:', formState);
      await signup(formState)
      setShowSuccessAlert(true);
    } catch (e) {
      setShowErrorAlert(true);
      console.error('signup() error in BuyerSignup:', e);
    }
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
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
