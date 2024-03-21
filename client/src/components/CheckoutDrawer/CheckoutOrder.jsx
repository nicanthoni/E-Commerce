import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import productPhoto from "../../assets/images/shirt.jpg";
import { Divider } from "@mui/material";

// ORDER SUMMARY
export default function CheckoutOrder() {
  return (
    <Card
      className="order-container"
      sx={{ display: "flex", maxWidth: 245, padding: 1 }}
      elevation={1}
    >
      <CardMedia
        className="order-img"
        component="img"
        sx={{ width: "50%", height: "50%", objectFit: "contain" }}
        src={productPhoto}
        title="Product Name"
      />
      <CardContent className="order-description-container">
        <Typography variant="h6">
          Product Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity:
        </Typography>
        <CardActions sx={{}}>
          <Button size="small">Remove</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
