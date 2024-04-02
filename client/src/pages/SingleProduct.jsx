import {
  Typography,
  Box,
  Button,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Data from "../productData.json";

// Page that renders when clicking on a single product
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
          alignItems: { xs: "center", md: "flex-end" } 
        }}
      >
        <Stack>
          <Box
            sx={{
              height: { xs: "200px", md: "400px" },
              width: { xs: "200px", md: "400px" },
              overflow: "hidden",
              marginBottom: {xs: 3, md:0 }
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
        </Stack>
        <Stack direction="column" gap={3}
        sx={{ alignItems: {xs: 'center', md: 'flex-start'}, textAlign: {xs: 'center', md: 'left'}}}
        >
          {/* NAME data */}
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          
          {/* DESCRIPTION  data */}
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          
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
        </Stack>
      </Stack>
    </Container>
  );
}