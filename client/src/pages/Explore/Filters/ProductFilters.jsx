import { useState } from 'react';
import { Box, Stack, InputLabel, MenuItem, FormControl, Select } from '@mui/material';



export default function Filters() {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');


  // Set Category Filter
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  // Set Price Filter
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };


  return (
  <Stack direction={'row'} spacing={4}>

  {/* Date added filter */}
  <Box sx={{ width: 126 }}>
    <FormControl fullWidth size='small'>
      <InputLabel> Date added </InputLabel>
      <Select
        labelId='date-label'
        id='filter-date'
        value={date}
        label='Date Added'
        onChange={handleDateChange}
      >
        <MenuItem value={1}>Show all</MenuItem>
        <MenuItem value={2}>Newest</MenuItem>
        <MenuItem value={3}>Oldest</MenuItem>
      </Select>
    </FormControl>
  </Box>

    {/* Price filter */}
  <Box sx={{ width: 126 }}>
    <FormControl fullWidth size='small' >
      <InputLabel> Price </InputLabel>
      <Select
        labelId='price-label'
        id='filter-price'
        value={price}
        label='Price Filter'
        onChange={handlePriceChange}
      >
        <MenuItem value={1}>Show all</MenuItem>
        <MenuItem value={2}>Lowest to highest</MenuItem>
        <MenuItem value={3}>Highest to lowest</MenuItem>
      </Select>
    </FormControl>
  </Box>

</Stack>
  )
}