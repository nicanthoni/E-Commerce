import {
  Container,
  Stack,
  Typography,
  Box,
  Modal,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

import EngineeringIcon from '@mui/icons-material/Engineering';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';

export default function UserWishlist() {
  // contexts
  const { id } = useAuthContext();

  // Query user data
  const [loadUser, { loading, data, error, refetch: refetchUserData }] =
    useLazyQuery(User, {
      variables: { userId: id },
    });

  useEffect(() => {
    loadUser();
  }, [loadUser, data]);

  if (error) {
    console.error('GraphQL Error:', error);
  }
  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress color='primary' />
      </Box>
    );
  }
  if (!data || !data.user) {
    return <Typography>No user data found</Typography>;
  }

  // Wishlist data object
  const userWishlist = data.user.wishlist;
  console.log('user wishlist: ', userWishlist);

  // Group items by category -  creates object where each key is a category & the value is an array of items in that category
  const groupedByCategory = userWishlist.reduce((acc, item) => {
    const category = item.item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item.item);
    return acc;
  }, {});

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
      </Stack>

      {/* Render items grouped by category */}
      <Stack gap={2}>
        {Object.entries(groupedByCategory).map(([category, items]) => (
          <Box key={category}>
            <Typography variant='h6'>{category}:</Typography>
            <ImageList
              sx={{
                gridAutoFlow: 'column',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(160px,1fr)) !important',
                gridAutoColumns: 'minmax(160px, 1fr)',
              }}
            >
              {items.map((item, index) => (
                <ImageListItem key={index}>
                  <Box
                    key={index}
                    component='img'
                    src={
                      item.img.startsWith('/images/seededItems')
                        ? item.img
                        : `http://localhost:3001/${item.img}`
                    }
                    alt={item.name}
                    loading='lazy'
                    style={{ width: '100px', height: 'auto' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
