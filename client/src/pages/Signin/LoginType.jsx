import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

export default function LoginType() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText('');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'buyer') {
      setError(false);
      navigate('/signin/buyer');
    } else if (value === 'vendor') {
      setError(false);
      navigate('/signin/vendor');
    } else {
      setHelperText(`Select your account type`);
      setError(true);
    }
  };

  return (
    <>
      <Grid container component='main'>
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ marginBottom: 3, bgcolor: 'primary.main' }}>
              <SensorOccupiedIcon />
            </Avatar>

            <Typography variant='h5'>Choose your account type</Typography>

            <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 3 }} error={error} variant='standard'>
                <RadioGroup
                  sx={{ alignSelf: 'center' }}
                  aria-labelledby='demo-error-radios'
                  name='loginType'
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value='buyer'
                    control={<Radio sx={{ color: 'primary.main'}} />}
                    label='Buyer'
                  />
                  <FormControlLabel
                    value='vendor'
                    control={<Radio sx={{ color: 'primary.main'}}/>}
                    label='Vendor'
                  />
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button
                  variant='contained'
                  color='secondary'
                  type='submit'
                  sx={{
                    mt: 2,
                    color: 'primary.main',
                    textTransform: 'none',
                    borderRadius: 6,
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
            <Link
              href='/signup'
              variant='body2'
              sx={{ textDecoration: 'none' }}
            >
              Don't have an account? Sign up
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
