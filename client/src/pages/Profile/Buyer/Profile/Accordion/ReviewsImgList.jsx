import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  Rating,
  Link,
} from '@mui/material';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from '@mui/material';
import { formatDate } from '../../../../../utils/formatters/formatDate';
import InfoIcon from '@mui/icons-material/Info';

export default function ReviewsImgList({
  refetchUserData,
  loadUser,
  userData,
}) {
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

  // console.log('buyHistory: ', userData.buyHistory);

  return (
    <Box>
      <ImageList>
        {userData.buyHistory.map((order, index) => (
          <ImageListItem key={index}>
            <Button onClick={() => handleOpenModal(index)}>
              <img
                srcSet={
                  order.item.img.startsWith('/images/seededItems')
                    ? order.item.img
                    : `http://localhost:3001/${order.item.img}`
                }
                src={
                  order.item.img.startsWith('/images/seededItems')
                    ? order.item.img
                    : `http://localhost:3001/${order.item.img}`
                }
                alt={order.item.name}
                loading='lazy'
                style={{ width: '100px', height: 'auto' }}
              />
            </Button>
            <ImageListItemBar
              onClick={() => handleOpenModal(index)}
              title={order.item.name}
              subtitle={`Rating: ${
                order.item.ratings.length > 0
                  ? order.item.ratings[0].stars
                  : 'None'
              }`}
              sx={{ opacity: 0.7, height: '35%' }}
              actionIcon={
                <IconButton
                  sx={{ color: 'background.default' }}
                  aria-label={`info about ${order.item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />

            {/* Modal for each Order */}
            <Modal
              open={openModals[index] || false}
              onClose={() => handleCloseModal(index)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '1px solid #000',
                  boxShadow: 24,
                  p: 4,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  srcSet={
                    order.item.img.startsWith('/images/seededItems')
                      ? order.item.img
                      : `http://localhost:3001/${order.item.img}`
                  }
                  src={
                    order.item.img.startsWith('/images/seededItems')
                      ? order.item.img
                      : `http://localhost:3001/${order.item.img}`
                  }
                  alt={order.item.name}
                  loading='lazy'
                  style={{ width: '100px', height: 'auto', marginBottom: 15 }}
                />
                <Typography variant='caption'>
                  <Link href='#' underline='hover'>
                    {order.item.vendor.vendorName}
                  </Link>
                </Typography>
                <Typography variant='h6' component='h2'>
                  {order.item.name}
                </Typography>

                <Typography variant='caption' marginBottom={2}></Typography>
                <Typography textAlign='center' variant='caption'>
                  Reviewed on {' '}
                  {order.item.ratings.length > 0
                    ? formatDate(order.item.ratings[0].createdAt)
                    : 'No reviews'}
                </Typography>
                <Typography variant='caption' id='review-description'>
                  {order.item.ratings.length > 0
                    ? `'${order.item.ratings[0].review}'`
                    : 'No review'}
                </Typography>

                <Rating
                  name='read-only'
                  value={
                    order.item.ratings.length > 0
                      ? order.item.ratings[0].stars
                      : 0
                  }
                  readOnly
                />
              </Box>
            </Modal>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
