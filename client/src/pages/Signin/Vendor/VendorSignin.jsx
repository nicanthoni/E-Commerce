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
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useVendorSignin } from '../../../hooks/Signin/useVendorSignin';
import AuthAlert from '../../../components/Alerts/Auth/AuthAlert';
import Footer from '../../../components/Footer/Footer';

export default function Signin() {
  const { signin, stateError, isLoading } = useVendorSignin(); // custom signin hook
  const navigate = useNavigate();

  // Error & Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showLoginAlert, setShowLoginAlert] = useState(false);

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

  // OnSubmit - validation check + run signin() hook
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoginAlert(false); // Reset alert visibility

    try {
      const success = await signin(formState);
      if (success) {
        setAlertMessage('Login Successful.'); // Set success message
        setShowLoginAlert(true);
        setTimeout(() => {
          navigate('/profile'); // send to profile
          setShowLoginAlert(false); // Hide alert after delay
        }, 1500); // Delay to allow user to see the success alert
      } else {
        setAlertMessage('Login Failed.'); // Set failure message
        setShowLoginAlert(true);
        setTimeout(() => {
          // Remove alert after delay
          setShowLoginAlert(false);
        }, 1500);
      }
    } catch (e) {
      console.error('signin() error in BuyerSignin component:', e);
    }
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ marginTop: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ marginBottom: 3, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Vendor Sign in</Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                sx={{ bgcolor: 'white.main' }}
                InputLabelProps={{
                  sx: { color: 'text.primary' }, // Change the label color
                }}
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
                sx={{ bgcolor: 'white.main' }}
                InputLabelProps={{
                  sx: { color: 'text.primary' }, // Change the label color
                }}
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
              borderRadius: 6,
            }}
          >
            Sign in
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                href='/signup'
                variant='body2'
                sx={{ textDecoration: 'none' }}
              >
                Don't have an account? Sign up here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* ⚠️ Alert ⚠️ */}
      <AuthAlert visible={showLoginAlert} message={alertMessage} />
    </Container>
  );
}
