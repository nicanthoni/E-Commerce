import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
  useTheme,
  Box,
  Rating,
} from '@mui/material';
import { Typography, Grid, Stack } from '@mui/material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import placeholder from '../../../assets/images/brand/no-products.svg';
import AddToCart from '../../../components/Buttons/AddToCart';
import WishlistButton from '../../../components/Buttons/WishlistButton';
import { useState, useEffect, useContext } from 'react';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useCart } from '../../../hooks/Products/useCart';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';
import RemoveFromCart from '../../../components/Buttons/RemoveFromCart';
import { getAverage } from '../../../utils/calculations/getAverage';
import {
  sortByPriceAsc,
  sortByPriceDesc,
  sortByAlphabetical,
  sortByReverseAlphabetical,
  sortByNewest,
} from '../../../utils/filters/productFilters';
import { SortProductsContext } from '../../../contexts/SortContext';
import Pagination from '../../../components/pagination/pagination';

export default function AllProducts(props) {
  // Contexts
  const { user, id: userId } = useAuthContext();
  const { selectedSortBy } = useContext(SortProductsContext);

  // Pagination - associated states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(
    props.isMobile ? 16 : 12
  );

  // Wishlist & Cart statuses
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [cartStatus, setCartStatus] = useState({});

  // SortBy state
  const [sortedProducts, setSortedProducts] = useState(props.products); // Product data passed from <Explore/>

  // Alert visibility and contents
  const [alertMessage, setAlertMessage] = useState('');
  const [itemAlertVisible, setItemAlertVisible] = useState(false);

  // Hook - add/remove wishlist item
  const { addWishlist, deleteWishlist } = useWishlist();
  const { addCart, deleteCart } = useCart();

  // Update wishlistStatus state based on usersWishlist
  useEffect(() => {
    if (Array.isArray(props.usersWishlist)) {
      const status = {};
      props.products.forEach((product) => {
        status[product._id] = props.usersWishlist.includes(product._id);
      });
      setWishlistStatus(status);
    }
  }, [props.usersWishlist, props.products]);

  // Update cartStatus state based on usersCart
  useEffect(() => {
    if (Array.isArray(props.usersCart)) {
      const status = {};
      props.products.forEach((product) => {
        status[product._id] = props.usersCart.includes(product._id);
      });
      setCartStatus(status);
    }
  }, [props.usersCart, props.products]);

  // Effect to sort products based on selectedSortBy context value
  useEffect(() => {
    const sortFunction =
      {
        'Price: Low-High': sortByPriceAsc,
        'Price: High-Low': sortByPriceDesc,
        'Name: A-Z': sortByAlphabetical,
        'Name: Z-A': sortByReverseAlphabetical,
        Newest: sortByNewest,
      }[selectedSortBy] || ((products) => products);

    setSortedProducts(sortFunction([...props.products]));
  }, [props.products, selectedSortBy]);

  // Pagination - products to display based on pagination
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(
    firstProductIndex,
    lastProductIndex
  );

  // Handle wishlist onClick
  const handleWishlist = async (itemId) => {
    if (user) {
      const isInWishlist = props.usersWishlist.includes(itemId); // Check if item with matching id is in wishlist
      try {
        if (isInWishlist) {
          // Item already wishlisted, so delete it
          await deleteWishlist(itemId, userId);
          setAlertMessage('Removed');
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
        } else {
          // Item not in wishlist, so add it
          await addWishlist(itemId, userId);
          setAlertMessage('Added');
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
        }
        props.refetchUserData(); // refetch wishlist after deleting or adding item
      } catch (e) {
        console.log('Error: ', e);
      }
    } else {
      // for non-authenticated users
      setAlertMessage('Sign in first');
      setItemAlertVisible(true);
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 1000);
    }
  };

  // Handle Cart onClick
  const handleCart = async (itemId) => {
    if (user) {
      const isInCart = props.usersCart.includes(itemId); // Check if item with matching id is in wishlist
      try {
        if (isInCart) {
          // if item's in the cart already, delete it
          await deleteCart(itemId, userId); // delete item from users cart
          setAlertMessage('Removed'); // set message
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
          props.refetchUserData();
        } else {
          // if item's not in cart, add it
          await addCart(itemId, userId); // call add to cart hook
          setAlertMessage('Added'); // set message
          setItemAlertVisible(true); // show alertprops.props.
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
          props.refetchUserData();
        }
      } catch (e) {
        console.log('Add to cart error:', e);
      }
    } else {
      // for non-authenticated users
      setAlertMessage('Sign in first');
      setItemAlertVisible(true);
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 2500);
    }
  };

  // Average Rating calculation
  const avgStars = (ratings) => {
    if (ratings.length === 0) {
      return 0; // case with no ratings
    }
    const starsArray = ratings.map((rating) => rating.stars);
    return getAverage(starsArray);
  };

  return (
    <Grid container marginBottom={0} spacing={2} justifyContent='center'>
      {/* If no products in  category.... else */}
      {!props.products || props.products.length === 0 ? (
        <Grid item xs={12} textAlign='center'>
          <Typography variant='h6'>
            No items in stock for this category.
          </Typography>
          <img
            src={placeholder}
            alt='No products'
            style={{ maxWidth: '100%' }}
          />
          {/* Link required without premium sub */}
          <Typography variant='caption'>
            <Link href='https://storyset.com/data'>
              People illustrations by Storyset
            </Link>
          </Typography>
        </Grid>
      ) : (
        <>
          {/* Product cards */}
          {currentProducts.map((result, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card sx={{ maxWidth: 300 }}>
                <Stack direction='column' alignItems='center'>
                  {/* Wishlist - button */}
                  <Box alignSelf='flex-end'>
                    <WishlistButton
                      wishlistStatus={wishlistStatus[result._id] || false} // pass wishlist status (in or out) for product
                      onClick={() => handleWishlist(result._id)} // pass result._id to function as itemId
                    />
                  </Box>
                  {/* Clickable area */}
                  <CardActionArea
                    component={Link}
                    to={`/product/${result._id}`}
                    sx={{
                      width: '100%',
                      height: { xs: 125, md: 150, lg: 175 },
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}
                  >
                    <CardMedia
                      component='img'
                      image={
                        // check img property for if a seeded img, or img added via multer upload
                        result.img.startsWith('/images/seededItems')
                          ? result.img
                          : `http://localhost:3001/${result.img}`
                      }
                      alt={`Photo of a ${result.name}`}
                      sx={{
                        width: '85%',
                        height: '85%',
                        objectFit: 'contain',
                      }}
                    />
                  </CardActionArea>

                  <Stack direction='column' textAlign='center'>
                    <CardContent>
                      {/* Product Name */}
                      <Typography
                        fontWeight='bolder'
                        fontSize='small'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis', // ellipsis + hidden overflow if content exceeds 1 lines
                          overflow: 'hidden',
                        }}
                      >
                        {result.name}
                      </Typography>

                      {/* Product Rating */}
                      <Rating
                        size='small'
                        name='read-only'
                        value={avgStars(result.ratings)}
                        readOnly
                      />

                      {/* Product Price */}
                      <Typography fontWeight={'bold'} fontSize='small'>
                        ${result.price}
                      </Typography>

                      {/* Cart - button */}
                      <Box mt={1}>
                        {props.usersCart.includes(result._id) ? (
                          <RemoveFromCart
                            onClick={() => handleCart(result._id)} // pass result._id to function as itemId
                          />
                        ) : (
                          <AddToCart
                            onClick={() => handleCart(result._id)} // pass result._id to function as itemId
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
          {/* Pagination */}
          <Grid item xs={12}>
            <Box display='flex' pt={4} pb={4} justifyContent='center'>
              <Pagination
                totalProducts={props.products.length}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Box>
          </Grid>
        </>
      )}
      {/* ⚠️ Alerts ⚠️ - visibility controlled by local state */}
      <ItemAlert visible={itemAlertVisible} message={alertMessage} />
    </Grid>
  );
}
