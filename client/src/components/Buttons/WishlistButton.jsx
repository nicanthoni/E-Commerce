import { Box, Tooltip, Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useWishlist } from '../../hooks/Products/useWishlist';
import { useState, useEffect } from 'react';
import WishlistSuccess from '../Alerts/Wishlist/WishlistSuccess';
import WishlistWarning from '../Alerts/Wishlist/WishlistWarning';
import WishlistError from '../Alerts/Wishlist/WishlistError';


// user = auth status | userId = users id | itemId = itemsId 
// wishlistedItems = array of item Ids from users wishlist 
// refetchWishlist = refetch query 'Wishlist' for list of user cart's item ids
export default function WishlistButton({ user, userId, itemId, wishlistedItems, refetchWishlist }) {

  // States
  const [inWishlist, setInWishlist] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [warningAlertVisible, setWarningAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  // Hook - add/remove wishlist item
  const { addWishlist, deleteWishlist } = useWishlist();

  // Check if item with matching id is in users wishlist
  const isInWishlist = wishlistedItems.includes(itemId)

  // Update inWishlist state based on wishlistedItems 
  useEffect(() => {
    if (Array.isArray(wishlistedItems)) {
      setInWishlist(wishlistedItems.includes(itemId));
    }
  }, [wishlistedItems, itemId]);


  // Handle wishlist change
  const handleWishlistChange = async () => {
    if (user) {
      try {
        if (isInWishlist) { // Item already wishlisted, so delete it
          await deleteWishlist(itemId, userId);
          setSuccessMessage('Removed');
          setSuccessAlertVisible(true);
          setTimeout(() => {
            setSuccessAlertVisible(false);
          }, 2500);   
        } else { // Item not in wishlist, so add it
          await addWishlist(itemId, userId);
          setSuccessMessage('Added');
          setSuccessAlertVisible(true);
          setTimeout(() => {
            setSuccessAlertVisible(false);
          }, 2500);
        }
        refetchWishlist(); // refetch wishlist after deleting or adding item
      } catch (e) {
        console.log('Error: ', e);
      }
    } else { // for non-authenticated users
      setWarningAlertVisible(true);
      setTimeout(() => {
        setWarningAlertVisible(false);
      }, 2500);
    }
  };

  return (
    <>
      <Box>
        <Tooltip title='Add to wishlist' placement='right'>
          <Checkbox
            color='error'
            checked={inWishlist}
            onChange={handleWishlistChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        </Tooltip>
      </Box>

      {/* Alerts visibility controlled by local state */}
      <WishlistSuccess
        visible={successAlertVisible && successMessage === 'Added'}
        message='Added to wishlist.'
      />
      <WishlistSuccess
        visible={successAlertVisible && successMessage === 'Removed'}
        message='Removed.'
      />
      <WishlistWarning visible={warningAlertVisible} />
      <WishlistError visible={errorAlertVisible} />
    </>
  );
}
