import {ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


export default function OrdersImgList({ refetchUserData, loadUser, userData }) {

  return (
    <ImageList>
      <ImageListItem key='Subheader' cols={2}>
        <ListSubheader component='div'>Orders</ListSubheader>
      </ImageListItem>
      {userData.buyHistory.map((item, index) => (
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
      ))}
    </ImageList>
  );
}
