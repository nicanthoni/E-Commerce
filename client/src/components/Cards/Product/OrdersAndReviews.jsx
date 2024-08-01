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
import ProductReviewModal from '../../Modals/ProductReview';

// function OrdersAndReviewsMobile(props) {
//   // Modal states
//   const [open, setOpen] = useState(false);

//   // Handle Open Modal
//   const handleOpenModal = () => {
//     setOpen(true);
//   };

//   // Handle Close Modal
//   const handleCloseModal = () => {
//     setOpen(false);
//   };

//   return (
//     <Card elevation={1}>
//       <Grid
//         container
//         direction='row'
//         alignItems='flex-end'
//         bgcolor='background.default'
//       >
//         <Grid item xs={3}>
//           <Stack textAlign='center' bgcolor='background.paper' pt={2}>
//             {/* Vendors Name */}

//             <Box
//               sx={{
//                 width: '100%',
//                 height: 125,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               {/* Image */}
//               <CardMedia
//                 component='img'
//                 image={
//                   // check img property for if a seeded img, or img added via multer upload
//                   props.img.startsWith('/images/seededItems')
//                     ? props.img
//                     : `http://localhost:3001/${props.img}`
//                 }
//                 alt={`Photo of a ${props.name}`}
//                 sx={{
//                   height: '100%',
//                   objectFit: 'contain',
//                 }}
//               />
//             </Box>
//             <Stack width='100%' alignItems='center'>
//               <CardContent
//                 sx={{
//                   '&:last-child': {
//                     paddingBottom: 2,
//                   },
//                 }}
//               >
//                 {/* Name */}
//                 <Typography
//                   fontWeight='bold'
//                   fontSize={{ xs: 'small', sm: 'medium' }}
//                   sx={{
//                     display: '-webkit-box',
//                     WebkitLineClamp: 1,
//                     WebkitBoxOrient: 'vertical',
//                     textOverflow: 'ellipsis', // ellipsis + hidden overflow if text exceeds 1 line
//                     overflow: 'hidden',
//                   }}
//                 >
//                   {props.name}
//                 </Typography>
//                 <Rating size='small' value={props.rating} />
//               </CardContent>
//             </Stack>
//           </Stack>
//         </Grid>
//         <Grid item xs={9} textAlign='left'>
//           <Stack p={2} gap={4}>
//             <Stack>
//               <Typography variant='caption'>
//                 Reviewed on {formatDate(props.reviewDate)}
//               </Typography>
//               <Typography variant='caption' color='primary.main'>
//                 {' '}
//                 Sold by {''}
//                 <Link
//                   variant='caption'
//                   href='#'
//                   underline='hover'
//                   sx={{
//                     color: 'primary.main',
//                     '&:hover': { color: 'secondary.main' },
//                   }}
//                 >
//                   {props.vendorName}
//                 </Link>
//               </Typography>
//             </Stack>

//             <Typography variant='body2'>"{props.review}"</Typography>

//             <Stack direction='row' gap={1}>
//               <Button
//                 component={Link}
//                 href={`/product/${props.id}`}
//                 variant='contained'
//                 color='secondary'
//                 sx={{
//                   color: 'text.secondary',
//                   textTransform: 'none',
//                   textWrap: 'nowrap',
//                   borderRadius: 6,
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Buy Again
//               </Button>
//               <Divider flexItem orientation='vertical' />
//               <Button
//                 variant='contained'
//                 color='secondary'
//                 onClick={props.onClose}
//                 autoFocus
//                 sx={{
//                   color: 'text.secondary',
//                   textTransform: 'none',
//                   textWrap: 'nowrap',
//                   borderRadius: 6,
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Edit Review
//               </Button>
//             </Stack>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Review Modal (mobile) */}
//       <ProductReviewModal
//         modalState={open}
//         onClose={handleCloseModal}
//         review={props.review}
//         reviewDate={props.reviewDate}
//         rating={props.rating}
//         vendorName={props.vendorName}
//         id={props.id}
//       />
//     </Card>
//   );
// }

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
        direction='row'
        alignItems='flex-end'
        bgcolor='background.default'
      >
        <Grid item xs={3}>
          <Stack bgcolor='background.paper' pt={3} alignItems='center'>
            {/* Vendors Name */}

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
            <Stack width='100%' alignItems='center'>
              <CardContent>
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
                <Rating size='small' value={props.rating} />
              </CardContent>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={9} textAlign='left'>
          <Stack p={2} gap={4}>
            <Stack>
              <Typography variant='caption'>
                Reviewed on {formatDate(props.reviewDate)}
              </Typography>
              <Typography variant='caption' color='primary.main'>
                {' '}
                Sold by {''}
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
            </Stack>

            <Typography variant='body2'>"{props.review}"</Typography>

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
      <ProductReviewModal
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
