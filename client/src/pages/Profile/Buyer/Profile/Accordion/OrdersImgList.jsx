import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function OrdersImgList({ refetchUserData, loadUser, userData }) {
  return (
    <ImageList>
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
            sx={{ opacity: 0.7, height: '35%' }}
            actionIcon={
              <IconButton
                sx={{ color: 'background.main' }}
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
