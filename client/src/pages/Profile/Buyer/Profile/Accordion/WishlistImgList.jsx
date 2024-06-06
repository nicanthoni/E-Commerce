import { useState } from 'react';
import { Box, Stack, Button, Typography, Modal, Alert } from '@mui/material';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../../../utils/queries';
import { useWishlist } from '../../../../../hooks/Products/useWishlist';
import { useAuthContext } from '../../../../../hooks/useAuthContext';

export default function WishImglist () {
  const { id } = useAuthContext();
  const [openModals, setOpenModals] = useState([]);
  const [alert, setAlert] = useState({});
  const [showButton, setShowButton] = useState({});
  const [loadUser, { loading, data, error, refetch }] = useLazyQuery(User, {
    variables: { userId: id },
  });
  
  const { deleteWishlist, isLoading, stateError } = useWishlist(refetch);

  // Run loadUser when component renders - re-run if loadUser changes
  useEffect(() => {
    loadUser();
  }, [alert]);

  const handleOpenModal = (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);
  };

  const handleCloseModal = (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };

  // OnClick - remove item from wishlist
  const removeFromWishlist = async (userId, itemId, index) => {
    try {
      await deleteWishlist(itemId, userId);
      // console.log(`Item ${itemId} removed from User ${userId}s wishlist`);

      setShowButton((prev) => ({ ...prev, [itemId]: false }));
      setAlert((prev) => ({ ...prev, [itemId]: true }));
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, [itemId]: false }));
        handleCloseModal(index);
      }, 1800);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error fetching data</p>;
  }
  if (loading) {
    return <p>Loading...</p>; // Replace with loading spinner
  }
  if (!data || !data.user) {
    return <p>No user data found</p>;
  }

  // Grab data
  const user = data.user;
  // console.log('Users wishlist: ', user.wishlist );

  return (
    <Box>
      <ImageList>
        {user.wishlist.map((item, index) => (
          <ImageListItem key={index}>
            <Button onClick={() => handleOpenModal(index)}>
              <img
                srcSet={item.item.img}
                src={item.item.img}
                alt={item.item.name}
                loading='lazy'
                style={{ width: '100px', height: 'auto' }}
              />
            </Button>
            <ImageListItemBar
              onClick={() => handleOpenModal(index)}
              title={item.item.name}
              subtitle={`$${item.item.price}`}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.item.name}`}
                  onClick={() => handleOpenModal(index)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />

            {/* Modal */}
            <Modal
              open={openModals[index] || false}
              onClose={() => handleCloseModal(index)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
              sx={{ alignContent: 'center', justifySelf: 'center' }}
            >
              {/* Modal's Contents */}
              <Stack
                alignItems='center'
                width={400}
                bgcolor='background.paper'
                padding={4}
                boxShadow={24}
                gap={1}
              >
                <img
                  srcSet={item.item.img}
                  src={item.item.img}
                  alt={item.item.name}
                  loading='lazy'
                  style={{ width: '100px', height: 'auto' }}
                />

                <Typography id='modal-modal-title' fontWeight='bold'>
                  {item.item.name}
                </Typography>

                <Typography>${item.item.price}</Typography>

                <Typography variant='caption'>
                  {item.item.description}
                </Typography>

                {/* Button & Alert */}
                {showButton[item.item._id] !== false && (
                  <Button
                    onClick={() => removeFromWishlist(id, item.item._id, index)}
                    variant='contained'
                    color='secondary'
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                    }}
                  >
                    Remove from Wishlist
                  </Button>
                )}

                {alert[item.item._id] && (
                  <Alert severity='success' sx={{ width: '70%', mb: 2 }}>
                    Removed from wishlist.
                  </Alert>
                )}
              </Stack>
            </Modal>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
