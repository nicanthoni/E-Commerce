import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

export default function FilterCategory() {
  const [category, setCategory] = useState('Show all');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Grid item xs={6} display={'flex'} justifyContent={'right'} padding={2}>
    <Box sx={{ width: 105 }}>
      <FormControl fullWidth size='small' >
        <InputLabel id='category-select-label'>Category</InputLabel>
        <Select
          labelId='category-label'
          id='filter-category'
          value={category}
          label='Category'
          onChange={handleChange}
        >
          <MenuItem value={10}>Men</MenuItem>
          <MenuItem value={20}>Women</MenuItem>
          <MenuItem value={30}>Show all</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Grid>
  );
}
