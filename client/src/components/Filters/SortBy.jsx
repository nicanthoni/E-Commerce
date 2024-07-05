import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SortBy({ handleSorting }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    handleSorting(selectedFilter); // Call handleSorting function from props
  };

  return (
    <Box>
      <FormControl fullWidth size='small'>
        <InputLabel>Sort by:</InputLabel>
        <Select
          sx={{ bgcolor: 'white.main' }}
          value={filter}
          onChange={handleFilterChange}
          label='Sort by'
        >
          <MenuItem value='Price: Low-High'>Price: Low-High</MenuItem>
          <MenuItem value='Price: High-Low'>Price: High-Low</MenuItem>
          <MenuItem value='Name: A-Z'>Name: A-Z</MenuItem>
          <MenuItem value='Name: Z-A'>Name: Z-A</MenuItem>
          <MenuItem value='Newest'>Newest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
