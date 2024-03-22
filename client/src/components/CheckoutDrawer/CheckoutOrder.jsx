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
    justifyContent={'center'} 
    alignItems={'center'} 
    margin={1}
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
        <Typography variant="caption" fontWeight={'bold'}sx={{fontSize: 10}}>Product Name</Typography>
        <Typography variant="caption"sx={{fontSize: 10}}> Quantity: </Typography>
        <Typography variant="caption"sx={{fontSize: 10}}> Item Price: </Typography>
        <Typography variant="caption"sx={{fontSize: 10}}> Product Category </Typography>
      </Stack>
    </Stack>
  );
}
