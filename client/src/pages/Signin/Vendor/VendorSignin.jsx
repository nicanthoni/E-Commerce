import Copyright from '../../../components/Footer/Copyright';
import {
  Avatar,
  Button,
  Alert,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useVendorSignin } from '../../../hooks/_tests_/useVendorSignin';



export default function Signin() {
  const { user }  = useAuthContext() //auth context
  const { signin, stateError, isLoading } = useVendorSignin() // custom Signin() hook
  const navigate = useNavigate();

  // Error & Alert States
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  // On render, check if logged in => Send to profile page
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, []);


  // Form state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });


  // OnChange, update form state
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



    // OnSubmit - validation check + run signin() hook
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrorMessage(''); // Clear prev error message
  
      try {
        // console.log('Signin Form state:', formState);
        await signin(formState)
        setShowSuccessAlert(true);
      } 
      catch (e) {
        setShowErrorAlert(true);
        console.error('signin() error in BuyerSignin:', e);
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
        {showSuccessAlert && (
          <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
            Sign in successful! Redirecting to profile...
          </Alert>
        )}
        {showErrorAlert && (
          <Alert
            severity='error'
            sx={{ width: '100%', mb: 2 }}
            onClose={handleClearError}
          >
            {errorMessage ||
              'Sign in failed! Double check your credentials and account type are accurate, or create an account if you havent'}
          </Alert>
        )}
        <Avatar sx={{ marginBottom: 3, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Vendor Sign in</Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
            Sign in
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                href='/signup'
                variant='body2'
                align='center'
                sx={{ textDecoration: 'none' }}
              >
                Don't have an account? Sign up here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
