import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Typography } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useAuthContext } from '../../hooks/useAuthContext';


export default function MainSupport () {
    const { user } = useAuthContext()
    const navigate = useNavigate();


    useEffect(() => {
        // Show alert after 2 second timeout
        const timeoutId = setTimeout(() => {
            alert('Check back later! 👋');
            
            // Check auth, send to  '/' or '/profile' after selecting 'Ok'
            if ( user ) {
                navigate('/Profile')
            } else {
            navigate('/');}

        }, 1500);

        // Cleanup timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, []);



return (
    <Container maxWidth='xl'>
        
        <Stack 
        my={15}
        direction='column' 
        alignItems={'center'}
        spacing={2} 
        textAlign='center'>

            <EngineeringIcon 
                fontSize='large' 
                sx={{ color: 'primary.main' }}
            />

            <Typography variant='h5' fontStyle='italic'>
                This page is currently undergoing maintenence.
            </Typography>

        </Stack>
    
    </Container>

)

}