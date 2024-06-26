import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function CartImgList({ refetchUserData, loadUser, userData }) {
  const subtotal = userData.cart
    .reduce((total, item) => {
      // Check if item and item.item are not null
      return item && item.item ? total + item.item.price : total;
    }, 0)
    .toFixed(2);

  return (
    <ImageList>
      {userData.cart.map((item, index) => {
        return (
          <ImageListItem key={index}>
            <img
              srcSet={
                item.item.img.startsWith('/images/seededItems')
                  ? item.item.img
                  : `http://localhost:3001/${item.item.img}`
              }
              src={
                item.item.img.startsWith('/images/seededItems')
                  ? item.item.img
                  : `http://localhost:3001/${item.item.img}`
              }
              alt={item.item.name}
              loading='lazy'
              style={{ width: '100px', height: 'auto', alignSelf: 'center' }}
            />
            <ImageListItemBar
              title={item.item.name}
              subtitle={item.item.vendor.vendorName}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
