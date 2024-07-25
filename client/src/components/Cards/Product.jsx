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
} from '@mui/material';
import AddToCart from '../Buttons/AddToCart';
import RemoveFromCart from '../Buttons/RemoveFromCart';
import WishlistButton from '../Buttons/WishlistButton';
import { getAverage } from '../../utils/calculations/getAverage';

export default function Product(props) {
  // Calulation avg rating
  const avgRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }
    const ratingsArray = ratings.map((rating) => rating.stars);
    return getAverage(ratingsArray);
  };

  return (
    <Card elevation={3}>
      <Stack gap={{xs: 0, sm: 1}} textAlign='center'>
        <Box alignSelf='flex-end'>
          <WishlistButton
            wishlistStatus={props.inWishlist}
            onClick={props.handleWishlist}
          />
        </Box>
        <CardActionArea
          component={Link}
          href={`/product/${props.id}`}
          sx={{
            width: '100%',
            height: 125,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Img */}
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
              width: { xs: '90%', sm: '100%' },
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </CardActionArea>
        <Stack bgcolor='background.default' width='100%' alignItems='center'>
          <CardContent>
            {/* Name */}
            <Typography
              fontWeight='bolder'
              fontSize='small'
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

            {/* Rating */}
            <Rating
              size='small'
              name='read-only'
              value={avgRating(props.ratings)}
              readOnly
            />
            {/* Price */}
            <Typography fontSize='small' fontWeight='bold'>
              ${props.price}
            </Typography>
            {/* Button */}
            {!props.inCart ? (
              <AddToCart onClick={props.handleCart} />
            ) : (
              <RemoveFromCart onClick={props.handleCart} />
            )}
          </CardContent>
        </Stack>
      </Stack>
    </Card>
  );
}
