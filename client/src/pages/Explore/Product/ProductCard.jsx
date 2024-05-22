import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Box, Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Data from '../../../data/productData.json'; // Sample product data
import { Tooltip } from '@mui/material';

export default function ProductCard() {
  return (
    <Grid container spacing={5} marginTop={4}>
      {Data.map((result, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} align='center'>
          <Card sx={{ maxWidth: 275, padding: '10px' }}>
            <CardActionArea component={Link} to={`/product/${result.id}`}>
              <Box sx={{ height: '100px', width: '100px' }}>
                <CardMedia
                  component='img'
                  image={result.img} /* IMAGE data */
                  alt='Product Photo'
                  sx={{
                    borderRadius: '5px',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <CardContent align='left'>
                <Typography gutterBottom variant='h5' component='div'>
                  {/* NAME data */}
                  {result.name}
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    // Apply ellipsis and hidden overflow when description content exceeds two lines length
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {/* DESCRIPTION  data */}
                  {result.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <Typography fontWeight={'bold'}>${result.price}</Typography>
                </Grid>
                <Grid item>
                  <Box>
                    <Tooltip title='Add to wishlist' placement='right'>
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
