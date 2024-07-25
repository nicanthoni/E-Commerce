import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  Rating,
  Link,
  Stack,
} from '@mui/material';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from '@mui/material';
import { formatDate } from '../../../../../utils/formatters/formatDate';
import InfoIcon from '@mui/icons-material/Info';

export default function OrdersAndReviewsImgList({
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
              sx={{ alignContent: 'center', justifySelf: 'center' }}
            >
              <Stack
                alignItems='center'
                width={400}
                bgcolor='background.paper'
                padding={4}
                boxShadow={24}
                gap={0}
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
                  Reviewed on{' '}
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
              </Stack>
            </Modal>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
