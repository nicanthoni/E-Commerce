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
import { vendor_Login } from '../../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Auth from '../../../utils/auth';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useSignin } from '../../../hooks/useSignin';

export default function Signin() {
  const { user }  = useAuthContext() //auth context
  const { signin, stateError, isLoading } = useSignin() // custom Signin() hook
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

  // Form state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  //  Mutation
  const [VendorLogin, { error, loading, data }] = useMutation(vendor_Login);

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

  // onSubmit:
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear prev error message

    if (errorMessage) {
      setShowErrorAlert(true);
      return;
    }

    try {
      const { data } = await VendorLogin({
        variables: { ...formState },
      });

      Auth.login(data.Vendorlogin.token);
      setShowSuccessAlert(true);
      setTimeout(() => {
        navigate(`/profile`);
      }, 1500);
    } catch (e) {
      setShowErrorAlert(true);
      console.error('AddUser Error:', e);
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
