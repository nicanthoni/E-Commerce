import {
  Card,
  Stack,
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Link,
  Button,
} from '@mui/material';
import { useState } from 'react';
import ProductReviewModal from '../../Modals/ProductReview';

export default function OrdersAndReviews(props) {
  // Modal states
  const [open, setOpen] = useState(false);

  // Handle Open Modal
  const handleOpenModal = () => {
    setOpen(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Card elevation={3}>
      <Stack textAlign='center'>
        {/* Vendors Name */}
        <Box alignSelf='flex-end'>
          <Typography pr={1}>
            <Link
              variant='caption'
              href='#'
              underline='hover'
              sx={{
                color: 'primary.main',
                '&:hover': { color: 'secondary.main' },
              }}
            >
              {props.vendorName}
            </Link>
          </Typography>
        </Box>

        {/* Clickable Action area - open modal if isMobile */}
        <CardActionArea
          disabled={props.isMobile ? false : true}
          onClick={handleOpenModal}
          sx={{
            width: '100%',
            height: 125,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Image */}
          <CardMedia
            component='img'
            image={
              // check img property for if a seeded img, or img added via multer upload
              props.img.startsWith('/images/seededItems')
                ? props.img
                : `http://localhost:3001/${props.img}`
            }
            alt={`Photo of a ${props.name}`}
            sx={{
              width: { xs: '80%', sm: '90%', md: '100%' },
              height: { xs: '80%', sm: '90%', md: '100%' },
              objectFit: 'contain',
              pb: 1,
            }}
          />
        </CardActionArea>
        <Stack bgcolor='background.default' width='100%' alignItems='center'>
          <CardContent
            sx={{
              '&:last-child': {
                paddingBottom: 2,
              },
            }}
          >
            {/* Name */}
            <Typography
              fontWeight='bold'
              fontSize={{ xs: 'small', sm: 'medium' }}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis', // ellipsis + hidden overflow if text exceeds 1 line
                overflow: 'hidden',
              }}
            >
              {props.name}
            </Typography>

            {/* USERS Rating (1) */}
            <Rating
              size='small'
              name='read-only'
              value={props.rating}
              readOnly
            />
            {/* Price */}
            <Typography fontSize='small' fontWeight='bold'>
              ${props.price}
            </Typography>
            {/* Button */}
            <Box pt={1.5}>
              <Button
                component={Link}
                href={`/product/${props.id}`}
                variant='contained'
                color='secondary'
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  textWrap: 'nowrap',
                  borderRadius: 6,
                  fontWeight: 'bold',
                }}
              >
                Buy Again
              </Button>
            </Box>
          </CardContent>
        </Stack>
      </Stack>

      {/* Review Modal (mobile) */}
      <ProductReviewModal
        modalState={open}
        onClose={handleCloseModal}
        review={props.review}
        reviewDate={props.reviewDate}
        rating={props.rating}
      />
    </Card>
  );
}
