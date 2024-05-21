import {  Typography, Container, Stack } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';


// Final Checkout page (Shipping, Billing, User, Order info)
export default function Checkout () {
    return (
        <Container maxWidth='xl'>  

            <Stack 
            my={18}
            direction='column' 
            alignItems={'center'}
            spacing={2} 
            textAlign='center'>

                <EngineeringIcon 
                    fontSize='large' 
                    sx={{ color: 'primary.main' }}
                />

                <Typography variant='h5' fontStyle='italic'>
                    The checkout page is undergoing maintenence.
                </Typography>
                <Typography variant='h6' fontStyle='italic'>
                    Check back later!
                </Typography>

        </Stack>
    </Container>
    )
}