import { Typography, Box, Button, Container, Stack, Rating } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import Data from "../../productData.json";

// Individual item view
export default function SingleProduct() {
  const { productId } = useParams();

  // Find the product in the Data array with the matching ID
  const product = Data.find((item) => item.id === parseInt(productId));

  // If the product with the given ID is not found, display a message
  if (!product) {
    return (
      <Typography variant="h6" textAlign="center" marginTop={15}>
        Product not found 🤔
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Stack
        marginTop={20}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-end" },
        }}
      >
        <Stack alignItems={'center'} gap={2}>
          {/* IMAGE data */}
          <Box
            sx={{
              height: { xs: "200px", md: "400px" },
              width: { xs: "200px", md: "400px" },
              overflow: "hidden",
            }}
          >
            <img
              src={product.img}
              alt="Product Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* RATING data */}
          <Box
          sx={{ marginBottom: {xs: 2, md: 0}}}
          >
          <Rating name="read-only" value={product.rating} readOnly/>
          </Box>
        </Stack>

        <Stack
          direction="column"
          gap={2}
          sx={{
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* PRICE data */}
          <Typography variant="h6" component="div">
            ${product.price}
          </Typography>

          {/* NAME data */}
          <Typography variant="h5" component="div" fontWeight='bold'>
            {product.name}
          </Typography>

          {/* DESCRIPTION  data */}
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>

          <Stack direction="row" gap={1}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "secondary.main",
                color: "primary.main",
                textTransform: "none",
              }}
            >
              Add to cart
            </Button>
            <Tooltip title="Add to wishlist" placement="right">
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
