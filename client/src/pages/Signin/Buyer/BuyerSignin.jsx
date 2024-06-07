import Copyright from '../../../components/Footer/Copyright';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useBuyerSignin } from '../../../hooks/Signin/useBuyerSignin';
import { useAuthContext } from '../../../hooks/useAuthContext';
import LoginAlert from '../../../components/Alerts/Auth/Login';


export default function Signin() {
  const { user } = useAuthContext(); // auth context
  const { signin } = useBuyerSignin(); // custom signin hook
  const navigate = useNavigate();

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // On render, check if logged in => Send to profile page
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  // Form state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // OnChange - update form state
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
    setAlertMessage(''); // Clear previous alert message

    try {
      const success = await signin(formState);
      if (success) {
        setAlertMessage('Login Successful.'); // Set success message
        setShowLoginAlert(true);
        setTimeout(() => {
          setShowLoginAlert(false); // Hide alert after delay
          navigate('/profile');
        }, 1500); // Delay to allow user to see the success alert
      } else {
        setAlertMessage('Login Failed.'); // Set failure message
        setShowLoginAlert(true);
        setTimeout(() => { // Remove alert after delay
          setShowLoginAlert(false);
        }, 2000);
      }
    } catch (e) {
      setAlertMessage('Login Failed.');
      setShowLoginAlert(true);
      setTimeout(() => { // Remove alert after delay
        setShowLoginAlert(false);
      }, 2000);
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
        <Avatar sx={{ marginBottom: 3, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Buyer Sign in</Typography>
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

      {/* Alert */}
      <LoginAlert visible={showLoginAlert} message={alertMessage} />

      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
