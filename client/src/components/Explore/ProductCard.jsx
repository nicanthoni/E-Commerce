import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box, Grid } from "@mui/material";
import Data from '../../productData.json'; // Sample product data

export default function ProductCard() {
  return (
    <Grid container spacing={2}>
      {Data.map((result, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} align="center">
          <Card sx={{ maxWidth: 275, padding: "10px", marginBottom: '10px' }}>
            <CardActionArea component={Link} to={`/product/${result.id}`}>
              <Box sx={{ height: "100px", width: "100px" }}>
                <CardMedia
                  component="img"
                  image={result.img} /* IMAGE data */
                  alt="Product Photo"
                  sx={{
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <CardContent align='left'>
                <Typography gutterBottom variant="h5" component="div">
                  {/* NAME data */}
                  {result.name}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                  sx={{
                    // Apply ellipsis and hidden overflow when description content exceeds two lines length
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {/* DESCRIPTION  data */}
                  {result.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                sx={{ bgcolor: "secondary.main", color: "primary.main", textTransform: 'none' }}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
