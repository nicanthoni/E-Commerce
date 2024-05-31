import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../../../utils/queries';
import { useAuthContext } from '../../../../../hooks/useAuthContext';


export default function OrdersImgList() {
  const { id } = useAuthContext()
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id },
  });

  // Run loadUser 1x when component renders - re-run loadUser if it changes
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error fetching data</p>;
  }
  if (loading) {
    return <p>Loading...</p>; // Replace with loading spinner
  }
  if (!data || !data.user) {
    return <p>No user data found</p>;
  }

  // Grab data
  const user = data.user;
  // console.log('User Order history: ', user.buyHistory)

  return (
    <ImageList>
      <ImageListItem key='Subheader' cols={2}>
        <ListSubheader component='div'>Orders</ListSubheader>
      </ImageListItem>
      {user.buyHistory.map((item, index) => (
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
