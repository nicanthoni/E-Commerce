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
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { formatDate } from '../../../utils/formatters/formatDate';
import EditReviewModal from '../../Modals/EditReview';

function OrdersAndReviewsDesktop(props) {
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
    <Card elevation={1}>
      <Grid
        container
        direction={props.isMobile ? 'column' : 'row'}
        alignItems={props.isMobile ? 'flex-start' : 'flex-end'}
        bgcolor='background.default'
      >
        {/* Product */}
        <Grid item xs={3}>
          <Stack
            bgcolor='background.paper'
            pt={props.isMobile ? 1 : 3}
            pb={props.isMobile ? 1 : 0}
            alignItems='center'
            direction={props.isMobile ? 'row' : 'column'}
          >
            <Box
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
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <CardContent>
              <Stack
                width='100%'
                alignItems='center'
                sx={{ textWrap: 'nowrap' }}
              >
                {/* Name */}
                <Typography
                  fontWeight='bold'
                  fontSize={{ xs: 'small', md: 'default' }}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis', // ellipsis + hidden overflow if text exceeds 1 line
                    overflow: 'hidden',
                    textWrap: 'nowrap',
                  }}
                >
                  {props.name}
                </Typography>

                <Typography variant='caption'>
                  Reviewed {formatDate(props.reviewDate)}
                </Typography>

                {/* Rating */}
                <Rating size='small' value={props.rating} />
              </Stack>
            </CardContent>
          </Stack>
        </Grid>

        {/* Review details */}
        <Grid item xs={9} p={1.5}>
          <Stack>
            <Typography
              textAlign='left'
              variant='body2'
              fontSize={{ xs: 'small', md: 'default' }}
            >
              "{props.review}"
            </Typography>

            <Stack direction='row' gap={0.5}>
              <Button
                component={Link}
                href={`/product/${props.id}`}
                variant='text'
                color='primary'
                sx={{
                  textTransform: 'none',
                  textWrap: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Buy Again
              </Button>
              <Divider flexItem orientation='vertical' />
              <Button
                onClick={handleOpenModal}
                variant='text'
                color='primary'
                autoFocus
                sx={{
                  textTransform: 'none',
                  textWrap: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Edit Review
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <EditReviewModal
        modalState={open}
        onClose={handleCloseModal}
        review={props.review}
        reviewDate={props.reviewDate}
        rating={props.rating}
        vendorName={props.vendorName}
        id={props.id}
      />
    </Card>
  );
}

export default function OrdersAndReviews(props) {
  return <OrdersAndReviewsDesktop {...props} />;
}

// IF USING A MOBILE COMPONENT VARIATION
// export default function OrdersAndReviews(props) {
//   return props.isMobile ? (
//     <OrdersAndReviewsMobile {...props} />
//   ) : (
//     <OrdersAndReviewsDesktop {...props} />
//   );
// }
