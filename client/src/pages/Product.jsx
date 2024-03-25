import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";


// Page that renders when clicking on a single product
export default function Product () {
const { productId } = useParams();

    return (
        <Typography variant="h2">Single Products Page</Typography>
    )
}