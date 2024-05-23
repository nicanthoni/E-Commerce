import { Link } from 'react-router-dom';
import {Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Box, Grid, Stack, Checkbox, Tooltip } from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material';
import Data from '../../../data/productData.json'; // Sample product data



export default function ProductCard() {

// OnChange handle wishlist
const handleWishlistChange = () => {
  console.log('added to wishlist')
}

  return (
    <Grid container spacing={5} marginTop={4} marginBottom={3}>
      {Data.map((result, index) => (

        // Grid item created for each product
        <Grid item xs={12} sm={6} md={4} key={index} align='center'>
          <Card sx={{ maxWidth: 275, padding: '8px' }}>

            {/* Clickable area of card */}
            <CardActionArea component={Link} to={`/product/${result.id}`}>
              <Box sx={{ height: '100px', width: '100px' }}>
                <CardMedia
                  component='img'
                  image={result.img} /* IMAGE data */
                  alt='Product Photo'
                  sx={{
                    marginTop: 2,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>


              {/* Card Content */}
              <CardContent sx={{ paddingBottom: 1}}>
                {/* name */}
                <Typography gutterBottom variant='h6'>
                  {result.name}
                </Typography>


                {/* description */}
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',  // ellipsis + hidden overflow when content exceeds 2 lines length
                    overflow: 'hidden',
                  }}
                >
                  {result.description}
                </Typography>
              </CardContent>
            </CardActionArea>

             
             {/* Price & Wishlist button stack */}
             <Stack direction='row' justifyContent='space-around'>
                
                <Typography alignSelf='center' fontWeight={'bold'}>${result.price}</Typography>
              
                <Box>
                  <Tooltip title='Add to wishlist' placement='right'>
                  <Checkbox
                    color='error'
                    onChange={handleWishlistChange}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                  </Tooltip>
                </Box>

            </Stack>
                
  
          </Card>
        </Grid>

      ))}
    </Grid>
  );
}
