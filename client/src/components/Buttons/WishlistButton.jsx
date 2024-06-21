import { Box, Tooltip, Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

export default function WishlistButton({ onClick, wishlistStatus }) {
  // wishlistStatus =  state for if the item is in the wishlist or not

  return (
    <Box>
      <Tooltip title='Add to wishlist' placement='right'>
        <Checkbox
          onClick={onClick}
          color='error'
          checked={wishlistStatus}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </Tooltip>
    </Box>
  );
}
