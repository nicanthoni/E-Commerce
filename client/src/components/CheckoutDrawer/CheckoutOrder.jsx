import productPhoto from "../../assets/images/shirt.jpg";
import {
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";

// ORDER SUMMARY
export default function CheckoutOrder() {
  return (
    <Stack 
    borderBottom={'inset'} 
    direction={"row"} 
    gap={1} 
    padding={1}
    margin={1}
    justifyContent={'center'} 
    alignItems={'center'} 
 >
        <Box sx={{height: "100px", width: "100px"}}>
          <img src={productPhoto}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain" // ensures  image fits within the Box
            }}
          />
        </Box>
      <Stack spacing={1} divider={<Divider orientation="horizontal"/>}>
        <Typography variant="caption"> Product Name </Typography>
        <Typography variant="caption"> Product Category </Typography>
        <Typography variant="caption"> Quantity: </Typography>
        <Typography variant="caption"> Item Price: </Typography>
      </Stack>
    </Stack>
  );
}
