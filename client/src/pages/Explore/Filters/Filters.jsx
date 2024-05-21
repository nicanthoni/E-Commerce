import { useState } from 'react';
import { Box, Stack, InputLabel, MenuItem, FormControl, Select } from '@mui/material';




export default function Filters() {
  const [category, setCategory] = useState('Show all');
  const [price, setPrice] = useState('Show all');


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
        <MenuItem value={10}>Men</MenuItem>
        <MenuItem value={20}>Women</MenuItem>
        <MenuItem value={30}>Show all</MenuItem>
      </Select>
    </FormControl>
  </Box>

    {/* Price filter */}
  <Box sx={{ width: 105 }}>
    <FormControl fullWidth size='small' >
      <InputLabel id='price-filter-select-label'>Sort by Price</InputLabel>
      <Select
        labelId='price-label'
        id='filter-price'
        value={price}
        label='Price Filter'
        onChange={handlePriceChange}
      >
        <MenuItem value={10}>Lowest to highest</MenuItem>
        <MenuItem value={20}>Highest to lowest</MenuItem>
        <MenuItem value={30}>Show all</MenuItem>
      </Select>
    </FormControl>
  </Box>

</Stack>
  )
}
