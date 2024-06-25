import { useState } from 'react';
import {Box, Button, IconButton, Typography, Modal, Rating} from '@mui/material';
import {ImageList, ImageListItem, ImageListItemBar, ListSubheader} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


export default function ReviewsImgList({ refetchUserData, loadUser, userData }) {
  const [openModals, setOpenModals] = useState([]);


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

  return (
    <Box>
      <ImageList>
        <ImageListItem key='Subheader' cols={2}>
          <ListSubheader component='div'>Reviewed Items</ListSubheader>
        </ImageListItem>
        {userData.ratings.map((rating, index) => (
          <ImageListItem key={index}>
            <Button onClick={() => handleOpenModal(index)}>
              <img
                srcSet={
                  rating.item.img.startsWith('/images/seededItems')
                    ? rating.item.img
                    : `http://localhost:3001/${rating.item.img}`
                }
                src={
                  rating.item.img.startsWith('/images/seededItems')
                    ? rating.item.img
                    : `http://localhost:3001/${rating.item.img}`
                }
                alt={rating.item.name}
                loading='lazy'
                style={{ width: '100px', height: 'auto' }}
              />
            </Button>
            <ImageListItemBar
              title={rating.item.name}
              subtitle={`Rating: ${rating.stars}`}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${rating.item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />

            {/* Modal for each Review */}
            <Modal
              open={openModals[index] || false}
              onClose={() => handleCloseModal(index)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={{position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '1px solid #000',
                boxShadow: 24,
                p: 4,
                textAlign: 'center'
                }}>
                <img
                  srcSet={
                    rating.item.img.startsWith('/images/seededItems')
                      ? rating.item.img
                      : `http://localhost:3001/${rating.item.img}`
                  }
                  src={
                    rating.item.img.startsWith('/images/seededItems')
                      ? rating.item.img
                      : `http://localhost:3001/${rating.item.img}`
                  }
                  alt={rating.item.name}
                  loading='lazy'
                  style={{ width: '100px', height: 'auto' }}
                />
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  {rating.item.name}
                </Typography>
                <Typography
                  variant='caption'
                  id='review-description'
                  sx={{ mt: 2 }}
                >
                  '{rating.review}'
                </Typography>

                <Rating name='read-only' value={rating.stars} readOnly />
              </Box>
            </Modal>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

// rating.createdAt
