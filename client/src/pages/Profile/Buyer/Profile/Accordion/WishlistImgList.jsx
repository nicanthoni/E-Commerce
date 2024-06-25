import { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Typography,
  Modal,
  Alert,
  Link,
} from '@mui/material';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useWishlist } from '../../../../../hooks/Products/useWishlist';
import { useAuthContext } from '../../../../../hooks/useAuthContext';

export default function WishImglist({ refetchUserData, userData }) {
  const { id } = useAuthContext();
  const [openModals, setOpenModals] = useState([]);
  const [alert, setAlert] = useState({});
  const [showButton, setShowButton] = useState({});

  const { deleteWishlist, isLoading, stateError } = useWishlist();

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
      setShowButton((prev) => ({ ...prev, [itemId]: false }));
      setAlert((prev) => ({ ...prev, [itemId]: true }));
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, [itemId]: false }));
        refetchUserData();
        handleCloseModal(index);
      }, 1700);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <Box>
      <ImageList>
        {userData.wishlist.map((item, index) => (
          <ImageListItem key={index}>
            <Button onClick={() => handleOpenModal(index)}>
              <img
                // srcSet={item.item.img}
                srcSet={
                  item.item.img.startsWith('/images/seededItems')
                    ? item.item.img
                    : `http://localhost:3001/${item.item.img}`
                }
                src={
                  item.item.img.startsWith('/images/seededItems')
                    ? item.item.img
                    : `http://localhost:3001/${item.item.img}`
                }
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
                gap={0}
              >
                <Typography variant='caption'>
                  <Link href={`/product/${item.item._id}`} underline='hover'>
                    View item
                  </Link>
                </Typography>
                <img
                  srcSet={
                    item.item.img.startsWith('/images/seededItems')
                      ? item.item.img
                      : `http://localhost:3001/${item.item.img}`
                  }
                  src={
                    item.item.img.startsWith('/images/seededItems')
                      ? item.item.img
                      : `http://localhost:3001/${item.item.img}`
                  }
                  alt={item.item.name}
                  loading='lazy'
                  style={{ width: '100px', height: 'auto', marginBottom: 10 }}
                />

                <Typography>${item.item.price}</Typography>

                <Typography id='modal-modal-title' fontWeight='bold'>
                  {item.item.name}
                </Typography>

                <Typography variant='caption' marginBottom={2}>
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
