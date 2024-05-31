import {
  Typography,
  Container,
  Stack,
  Grid,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import Auth from '../../../../utils/auth';
import { Vendor } from '../../../../utils/queries';
import Traffic from './Traffic';
import VendorInventory from './Inventory';
import MonthlySales from './Sales';



export default function VendorDashboard() {
  return (
    <>
    <Container maxWidth='xl'>
      <Grid container 
      direction='row' 
      my={12} 
      justifyContent='center' 
      textAlign='center' 
      spacing={4}>


        {/* Header */}
        <Grid item xs={12}>
          <Typography variant='h6' marginBottom={2}>
            Performance Analytics
          </Typography>

          <Divider variant='middle'/>
        </Grid>

        {/* Monthly Traffic */}
        <Grid item xs={12} marginBottom={2}>
          <Traffic/>
        </Grid>

        {/* Monthly sales */}
        <Grid item xs={12} md={6}>
          <MonthlySales/>
        </Grid>

        {/* Other Data */}
        <Grid item xs={12} md={6}>
          <VendorInventory/>
        </Grid>

        {/* Other Data */}
        <Grid item xs={12} md={6}>
        </Grid>

      </Grid>
    </Container>
    </>
  );
}
