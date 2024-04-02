import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useMutation } from '@apollo/client'
import { signup } from '../../utils/mutations'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Auth from '../../utils/auth';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        AppName
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function BuyerSignup() {
  const navigate = useNavigate()
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate(`/profile/${Auth.getProfile().data._id}`)
    }
  }, [])
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  })


  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [AddUser, { error, data }] = useMutation(signup)

  // OnChange handleChange:
const handleChange = (event) => {
  const { name, value } = event.target
  setFormState({
    ...formState,
    [name]: value,
  })
}

// On form Submission:
const handleSubmit = async (event) => {
  event.preventDefault()

  setErrorMessage('') // Clear previous error message

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formState.email)) {
    setErrorMessage('Invalid email')
  }

  if (formState.password.length < 8) {
    setErrorMessage((prevMessage) => prevMessage + ' Password should be at least 8 characters long')
  }

  if (errorMessage) {
    setShowErrorAlert(true)
    return
  }

  try {
    const { data } = await AddUser({
      variables: { ...formState },
    })
    Auth.login(data.AddUser.token)
    setShowSuccessAlert(true)

    setTimeout(() => {
      navigate(`/Profile/${data.AddUser.user._id}`)
    }, 1500)
  } catch (e) {
    setShowErrorAlert(true)
    console.error('AddUser Error:', e)
  }
}

// const handleClearError = () => {
//   setErrorMessage('')
//   setShowErrorAlert(false)
// }


  return (
    
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{  marginBottom: 3, bgcolor: 'primary.main' }}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography variant="h5">
            Buyer Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: 'none', bgcolor: 'secondary.main', color: 'primary.main' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2" align='center' sx={{textDecoration: 'none'}}>
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