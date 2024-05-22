import { useState } from 'react';
import { Box, Stack, InputLabel, MenuItem, FormControl, Select } from '@mui/material';



export default function Filters() {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');


  // Set Category Filter
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Set Price Filter
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
  <Stack direction={'row'} spacing={3}>

  {/* Category filter */}
  <Box sx={{ width: 105 }}>
    <FormControl fullWidth size='small' >
      <InputLabel id='category-select-label'>Category</InputLabel>
      <Select
        labelId='category-label'
        id='filter-category'
        value={category}
        label='Category'
        onChange={handleCategoryChange}
      >
        <MenuItem value={1}>Men</MenuItem>
        <MenuItem value={2}>Women</MenuItem>
        <MenuItem value={3}>Show all</MenuItem>
      </Select>
    </FormControl>
  </Box>

    {/* Price filter */}
  <Box sx={{ width: 105 }}>
    <FormControl fullWidth size='small' >
      <InputLabel id='price-filter-select-label'>Price</InputLabel>
      <Select
        labelId='price-label'
        id='filter-price'
        value={price}
        label='Price Filter'
        onChange={handlePriceChange}
      >
        <MenuItem value={1}>Lowest to highest</MenuItem>
        <MenuItem value={2}>Highest to lowest</MenuItem>
        <MenuItem value={3}>Show all</MenuItem>
      </Select>
    </FormControl>
  </Box>

</Stack>
  )
}
