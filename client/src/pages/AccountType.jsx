import Copyright from "../components/Footer/Copyright";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AccountType() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(
    "You can have both, but email addresses must be unique"
  );

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "buyer") {
      setError(false);
      navigate("/signup/buyer");
    } else if (value === "vendor") {
      setError(false);
      navigate("/signup/vendor");
    } else {
      setHelperText("Please select an account type.");
      setError(true);
    }
  };

  return (
    <Grid container component="main">
      <Grid item xs={12}>
        <Box
          sx={{
            my: 7,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ marginBottom: 3, bgcolor: "primary.main" }}>
            <SensorOccupiedIcon />
          </Avatar>

          <Typography variant="h5">Choose your account type</Typography>

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} error={error} variant="standard">
              <FormLabel id="demo-error-radios" sx={{ marginBottom: 2 }}>
                Hint: Do you intend to sell or purchase items?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label="Buyer"
                />
                <FormControlLabel
                  value="vendor"
                  control={<Radio />}
                  label="Vendor"
                />
              </RadioGroup>
              <FormHelperText>{helperText}</FormHelperText>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  bgcolor: "secondary.main",
                  color: "primary.main",
                  textTransform: "none",
                }}
              >
                Submit
              </Button>
            </FormControl>
          </form>
          <Link color="text.secondary" href="/signin" variant="body2" sx={{ textDecoration: "none" }}>
                Already have an account? Sign in
              </Link>
          <Copyright sx={{ mt: 3 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
