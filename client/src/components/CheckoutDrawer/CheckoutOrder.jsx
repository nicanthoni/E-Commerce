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
    <Card sx={{ maxWidth: 245 }} elevation={1}>
      <CardMedia
        component="img"
        sx={{ height:'100%', width: '100%'}}
        src={productPhoto}
        title="Product Name"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category:
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Remove</Button>
      </CardActions>
    </Card>
   
  );
}
