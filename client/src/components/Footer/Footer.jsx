import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";


function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" textAlign={'center'}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" sx={{ textDecoration: 'none'}}>
        My Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Footer() {
  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 6,
            mt: "auto",
            backgroundColor: '#fff',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="body2" 
            textAlign={"center"}>
              My sticky footer can be found here.
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
  );
}
