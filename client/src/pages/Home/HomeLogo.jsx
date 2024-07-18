import { Stack, Box } from '@mui/material';
import homeGraphic from '../../assets/images/brand/home-graphic.svg';
import { Link } from '@mui/material';

export default function HomeLogo() {
  return (
    <Stack direction='column' textAlign={'center'}>
      
      <Box sx={{ padding: {xs: 4, sm: 6 }}}>

        <img src={homeGraphic} />

        {/* Link required without premium sub */}
        <Link justifyContent='center' 
        fontSize={8} 
        marginTop={0} 
        href='https://storyset.com/online' 
        sx={{  color: 'white.main'}}>
          People illustrations by Storyset
        </Link>
        
      </Box>

    </Stack>
  );
}

