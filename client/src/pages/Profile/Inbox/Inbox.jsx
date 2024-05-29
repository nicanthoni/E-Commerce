import { Container, Typography, Stack } from '@mui/material'
import EngineeringIcon from '@mui/icons-material/Engineering';

export default function Inbox () {
    return (
        <Container maxWidth='xl'>  

            <Stack 
            my={12}
            direction='column' 
            alignItems={'center'}
            spacing={2} 
            textAlign='center'>

                <EngineeringIcon 
                    fontSize='large' 
                    sx={{ color: 'primary.main' }}
                />

                <Typography variant='h5' fontStyle='italic'>
                    The inbox page is undergoing maintenence.
                </Typography>
                <Typography variant='h6' fontStyle='italic'>
                    Check back later!
                </Typography>

        </Stack>
    </Container>
    )
}