import React, { useContext, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SortProductsContext } from '../../contexts/SortContext';

export default function SortBy() {
  // Contexts
  const { handleSortByChange, selectedSortBy } = useContext(SortProductsContext);

  // States
  const [selected, setSelected] = useState(selectedSortBy);

  // onChange of sortBy filter - setFilter equal to value of selected filter & update selectedSortBy value (context)
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSelected(selectedFilter);
    handleSortByChange(selectedFilter); // Call handleSorting function from props
    console.log('Selected Filter :', selectedFilter);
  };

  return (
    <Box>
      <FormControl fullWidth size='small'>
        <InputLabel>Sort by:</InputLabel>
        <Select
          sx={{ bgcolor: 'white.main' }}
          value={selected}
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
