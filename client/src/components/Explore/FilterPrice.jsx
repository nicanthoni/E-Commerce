import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

export default function FilterPrice() {
  const [price, setPrice] = useState('Show all');

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Grid item xs={6} display={'flex'} justifyContent={'left'} padding={2}>
    <Box sx={{ width: 105 }}>
      <FormControl fullWidth size='small' >
        <InputLabel id="price-filter-select-label">Sort by Price</InputLabel>
        <Select
          labelId="price-label"
          id="filter-price"
          value={price}
          label="Price Filter"
          onChange={handleChange}
        >
          <MenuItem value={10}>Lowest to highest</MenuItem>
          <MenuItem value={20}>Highest to lowest</MenuItem>
          <MenuItem value={20}>Show all</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Grid>
  );
}
