import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import productImg from '../../assets/images/shirt.jpg'


export default function ProductCard () {
    return (
        <Card sx={{ maxWidth: 275 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={productImg}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
          size="small" 
          variant='contained'
          sx={{ bgcolor: "fourth.main", color: "white" }}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
      
)}