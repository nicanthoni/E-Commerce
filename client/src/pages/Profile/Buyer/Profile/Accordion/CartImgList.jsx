import {ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


export default function CartImgList({ refetchUserData, loadUser, userData  }) {
  const subtotal = userData.cart.reduce((total, item) => { // Calculate cart subtotal
    return total + item.item.price;
  },0).toFixed(2);
  

  return (
    <ImageList>
      <ImageListItem key='Subheader' cols={2}>
        <ListSubheader component='div'>Subtotal: ${subtotal} </ListSubheader>
      </ImageListItem>
      {userData.cart.map((item, index) => (
        <ImageListItem key={index}>
          <img
            srcSet={item.item.img}
            src={item.item.img}
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
      ))}
    </ImageList>
  );
}
