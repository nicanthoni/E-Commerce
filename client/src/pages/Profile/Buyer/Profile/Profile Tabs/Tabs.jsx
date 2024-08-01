import {
  Box,
  Typography,
  List,
  ListItem,
  Link,
  Container,
  Stack,
  Rating,
  Paper,
} from '@mui/material';
import DeleteAccountButton from '../../../../../components/Buttons/DeleteAccount';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import WishlistCard from '../../../../../components/Cards/Product/WishlistProduct';
import OrdersAndReviewsCard from '../../../../../components/Cards/Product/OrdersAndReviews';

export const AccountDetails = (props) => {
  return (
    <Paper sx={{ marginTop: 6 }} elevation={2}>
      <Box display='flex' justifyContent='flex-start' textAlign='center' p={1}>
        <Typography variant='caption'>
          <List>
            <ListItem>Name: {props.name}</ListItem>
            <ListItem>Email Address: {props.email}</ListItem>
            <ListItem>Account Type: {props.accountType}</ListItem>
            <ListItem>Member since: {props.memberSince}</ListItem>
            <ListItem>
              <DeleteAccountButton onClick={props.onClick} />
            </ListItem>
          </List>
        </Typography>
      </Box>
    </Paper>
  );
};

export const OrdersandReviews = (props) => {
  // Carousel settings
  const responsive = {
    lg: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
      slidesToSlide: 3,
    },
    md: {
      breakpoint: { max: 1200, min: 900 },
      items: 5,
      slidesToSlide: 3,
    },
    sm: {
      breakpoint: { max: 900, min: 600 },
      items: 4,
      slidesToSlide: 2,
    },
    xs: {
      breakpoint: { max: 600, min: 0 },
      items: 3,
      slidesToSlide: 2,
    },
  };

  // Order history data
  const orders = props.userData.buyHistory.map((item, index) => {
    const itemObject = item.item; // individual item objects
    const userId = props.userId; // user's ID
    const reviewData = itemObject.ratings.find(
      // Find rating obj (review, rating, reviewDate) from current user
      (rating) => rating.user._id === userId
    );
    return (
      <Box
        key={index}
        sx={{
          mx: props.isMobile ? { xs: 0.3, sm: 0.4, md: 0.8 } : 0,
          mb: props.isMobile ? { xs: 5 } : 0,
        }}
      >
        <OrdersAndReviewsCard
          isAuthenticated={props.isAuthenticated}
          id={item.item._id}
          userId={props.userId}
          vendorName={item.item.vendor.vendorName}
          review={reviewData ? reviewData.review : 'No review available'}
          reviewDate={reviewData ? reviewData.createdAt : 'N/A'}
          rating={reviewData ? reviewData.stars : 'No rating available'}
          img={item.item.img}
          name={item.item.name}
          price={item.item.price}
          isMobile={props.isMobile}
        />
      </Box>
    );
  });

  return (
    <Container
      maxWidth='lg'
      className='Wishlist container'
      sx={{ marginTop: 6 }}
    >
      <Box className='Wishlist container' textAlign='center'>
        {props.userData.buyHistory.length > 0 ? (
          props.isMobile ? (
            <Carousel responsive={responsive} keyBoardControl={true} showDots>
              {orders}
            </Carousel>
          ) : (
            <>{orders}</>
          )
        ) : (
          <Typography>
            There have been 0 orders placed. Explore items{' '}
            <Link underline='hover' fontWeight='bolder' href='/explore'>
              here!
            </Link>
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export const Wishlist = (props) => {
  // Carousel settings
  const responsive = {
    lg: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
      slidesToSlide: 3,
    },
    md: {
      breakpoint: { max: 1200, min: 900 },
      items: 5,
      slidesToSlide: 3,
    },
    sm: {
      breakpoint: { max: 900, min: 600 },
      items: 4,
      slidesToSlide: 2,
    },
    xs: {
      breakpoint: { max: 600, min: 0 },
      items: 3,
      slidesToSlide: 2,
    },
  };

  // cart data - ids
  const cartData = props.userData.cart.map((cartItem) => cartItem.item._id);

  // wishlist data - ids
  const wishlistData = props.userData.wishlist.map(
    (wishlistItem) => wishlistItem.item._id
  );

  // Users Wishlist
  const wishlist = props.userData.wishlist.map((item, index) => (
    <Box key={index} mx={{ xs: 0.3, sm: 0.4, md: 0.8, lg: 1 }} mb={5}>
      <WishlistCard
        isAuthenticated={props.isAuthenticated}
        id={item.item._id}
        userId={props.userId}
        img={item.item.img}
        name={item.item.name}
        price={item.item.price}
        ratings={item.item.ratings}
        inCart={cartData.includes(item.item._id) ? true : false}
        inWishlist={wishlistData.includes(item.item._id) ? true : false}
        handleWishlist={() => props.handleWishlist(item.item._id)}
        handleCart={() => props.handleCart(item.item._id, props.userId)}
      />
    </Box>
  ));

  return (
    <Container
      maxWidth='lg'
      className='Wishlist container'
      sx={{ marginTop: 6 }}
    >
      <Box className='Wishlist container' textAlign='center'>
        {props.userData.wishlist.length > 0 ? (
          <Carousel responsive={responsive} keyBoardControl={true} showDots>
            {wishlist}
          </Carousel>
        ) : (
          <Typography>
            There are 0 items in your wishlist. Explore items{' '}
            <Link underline='hover' fontWeight='bolder' href='/explore'>
              here!
            </Link>
          </Typography>
        )}
      </Box>
    </Container>
  );
};
