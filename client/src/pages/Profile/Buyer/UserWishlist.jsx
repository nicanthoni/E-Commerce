import { Container, Stack, Typography } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { categories } from '../../../data/itemData';

export default function UserWishlist() {
  return (
    <Container maxWidth='xl'>
      <Stack
        my={12}
        direction='column'
        alignItems={'center'}
        spacing={2}
        textAlign='center'
      >
        <EngineeringIcon fontSize='large' sx={{ color: 'primary.main' }} />

        <Typography variant='h5' fontStyle='italic'>
          The Wishlist page is undergoing maintenence.
        </Typography>
        <Typography variant='h6' fontStyle='italic'>
          Check back later!
        </Typography>

        {/* Make a section header for each category & display users wishlisted items by category */}

        {/* {categories.map((category) => (
                  <Typography key={category.id} value={category.name}>
                    {category.name}
                  </Typography>
                ))} */}
      </Stack>
    </Container>
  );
}
