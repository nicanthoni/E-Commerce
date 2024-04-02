import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  Box,
  CardContent,
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
    <Container maxWidth="lg">
      <Stack
        alignItems="flex-end"
        marginTop={20}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-end" },
        }}
      >
        <Stack>
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
        </Stack>
        <Stack direction="column" gap={2}>
          {/* NAME data */}
          <Typography variant="h5" component="div" align="center">
            {product.name}
          </Typography>
          <Divider />

          {/* DESCRIPTION  data */}
          <Typography variant="body1" color="text.secondary" align="center">
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

// Reform this into a Stack

// <Container maxWidth="lg">
// <Card sx={{  padding: "10px" }}>
//   <CardActionArea disabled>
//     <Box sx={{ height: "100px", width: "100px" }}>
//       <CardMedia
//         component="img"
//         image={product.img} /* IMAGE data */
//         alt="Product Photo"
//         sx={{
//           borderRadius: "5px",
//           width: "100%",
//           height: "100%",
//           objectFit: "contain",
//         }}
//       />
//     </Box>
//     <CardContent align="left">
//       <Typography gutterBottom variant="h5" component="div">

//         {/* NAME data */}
//         {product.name}
//       </Typography>
//   <Typography
//     variant="body2"
//     color="text.secondary"
//     sx={{
//       // Apply ellipsis and hidden overflow when description content exceeds two lines length
//       display: "-webkit-box",
//       WebkitLineClamp: 2,
//       WebkitBoxOrient: "vertical",
//       textOverflow: "ellipsis",
//       overflow: "hidden",
//     }}
//   >

//     {/* DESCRIPTION  data */}
//     {product.description}
//   </Typography>
//     </CardContent>
//   </CardActionArea>

//   <CardActions>
//     <Button
//       size="small"
//       variant="contained"
//       sx={{
//         bgcolor: "secondary.main",
//         color: "primary.main",
//         textTransform: "none",
//       }}
//     >
//       Add to cart
//     </Button>
//   </CardActions>

// </Card>
// </Container>
