import {
  Card,
  Stack,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Link,
  Button,
  Grid,
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
      <Grid container direction={{ xs: 'column', sm: 'row' }}>
        {/* Product */}
        <Grid
          display='flex'
          direction={{ xs: 'row', sm: 'column' }}
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          xs={12}
          sm={3}
          md={3}
          bgcolor='background.paper'
        >
          <CardMedia
            component='img'
            image={
              props.img.startsWith('/images/seededItems')
                ? props.img
                : `http://localhost:3001/${props.img}`
            }
            alt={`Photo of a ${props.name}`}
            sx={{
              objectFit: 'contain',
              width: { xs: '25%', sm: '60%' },
              pt: 2,
              pb: { xs: 2, sm: 0 },
            }}
          />

          <CardContent>
            <Stack width='100%' alignItems='center' sx={{ textWrap: 'nowrap' }}>
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

              <Rating size='small' value={props.rating} />
            </Stack>
          </CardContent>
        </Grid>

        {/* Review */}
        <Grid
          item
          xs={12}
          sm={9}
          md={9}
          bgcolor='background.default'
          p={1}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          alignContent='center'
        >
          <Box
            flexGrow={1}
            pt={{ xs: 3, sm: 4, md: 7 }}
            display='flex'
            alignItems='center'
          >
            <Typography
              variant='body2'
              fontStyle='italic'
              fontSize={{ xs: 'small', md: 'default' }}
            >
              "{props.review}"
            </Typography>
          </Box>

          <Stack direction='row' justifyContent='flex-end'>
            <Button
              component={Link}
              href={`/product/${props.id}`}
              variant='text'
              color='primary'
              size='small'
              sx={{
                textTransform: 'none',
                textWrap: 'nowrap',
              }}
            >
              Buy Again
            </Button>

            <Divider flexItem orientation='vertical' />

            <Button
              onClick={handleOpenModal}
              variant='text'
              color='primary'
              size='small'
              sx={{
                textTransform: 'none',
                textWrap: 'nowrap',
              }}
            >
              Edit Review
            </Button>
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
