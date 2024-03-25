import { Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadButton from "./UploadButton";

  

  
const defaultTheme = createTheme();

export default function AddItemForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          vendor: data.get("vendor"),
          product: data.get("product"),
          description: data.get("description"),
          price: data.get("price"),
        });
      };
    
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >

              <Typography component="h1" variant="h5">
                Add Product
              </Typography>

              <Box margin={1}>
                {/* Upload image file component */}
              <UploadButton/>
              </Box>

              {/* Form */}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                    {/* Vendors Name */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="vendorName"
                      label="Vendor Name"
                      name="vendor"
                    />
                  </Grid>
                  {/* Vendors Product */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="vendorProductName"
                      label="Product Name"
                      name="product"
                    />
                  </Grid>
                  {/* Product Description */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="description"
                      label="Product Description"
                      id="vendorProductDescription"
                    />
                  </Grid>
                  {/* $ Product Price $ */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="price"
                      label="Price"
                      id="vendorProductPrice"
                    />
                  </Grid>
                </Grid>
                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit 
                </Button>
              </Box>

            </Box>
          </Container>
        </ThemeProvider>
      )
}