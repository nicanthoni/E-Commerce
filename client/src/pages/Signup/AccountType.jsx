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

export default function AccountType() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    // setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'buyer') {
      setError(false);
      navigate('/signup/buyer');
    } else if (value === 'vendor') {
      setError(false);
      navigate('/signup/vendor');
    } else {
      setHelperText('Select your preferred account type');
      setError(true);
    }
  };

  return (
    <>
      <Grid container marginTop={6}>
        <Grid item xs={12}>
          <Box
            sx={{
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
                  name='accountType'
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value='buyer'
                    control={<Radio sx={{ color: 'primary.main' }} />}
                    label='Buyer'
                  />
                  <FormControlLabel
                    value='vendor'
                    control={<Radio sx={{ color: 'primary.main' }} />}
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
              href='/signin'
              variant='body2'
              sx={{ textDecoration: 'none' }}
            >
              Already have an account? Sign in
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
