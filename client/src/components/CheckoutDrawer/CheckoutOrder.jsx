import productPhoto from "../../assets/images/shirt.jpg";
import { Stack, Box, Typography, Divider } from "@mui/material";

// ORDER SUMMARY
export default function CheckoutOrder() {
  return (
    <Stack
      borderBottom="inset"
      direction="row"
      gap={1}
      padding={1}
      flexWrap="nowrap"
    >
      {/* Product img */}
      <Box sx={{ height: "100px", width: "100px" }}>
        <img
          src={productPhoto}
          alt="Product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // ensures image fits within the Box
          }}
        />
      </Box>

      {/* STACK for product details */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        width="50%"
        gap={2}
      >
        {/* Name & Price */}
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography
            variant="caption"
            fontWeight={"bold"}
            sx={{ fontSize: 12 }}
          >
            Product Name 
          </Typography>
          <Typography
            variant="caption"
            fontWeight={"bold"}
            sx={{ fontSize: 12, marginLeft: "auto" }}
          >
            $0
          </Typography>
        </Stack>

        {/* Quantity --> make incrementable componenet to go here */}
        <Typography variant="caption" sx={{ fontSize: 10 }}>
          Quantity: __
        </Typography>
      </Stack>
    </Stack>
  );
}
