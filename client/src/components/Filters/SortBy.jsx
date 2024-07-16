import React, { useContext, useState } from 'react';
import { FormControl, Box, MenuItem, Select, Typography } from '@mui/material';

import { SortProductsContext } from '../../contexts/SortContext';

export default function SortBy() {
  // Contexts
  const { handleSortByChange, selectedSortBy } =
    useContext(SortProductsContext);

  // States
  const [selected, setSelected] = useState(selectedSortBy); // defaults to 'Newest'-determined by ContextProvider

  // onChange of sortBy filter - setFilter equal to value of selected filter & update selectedSortBy value (context)
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSelected(selectedFilter);
    handleSortByChange(selectedFilter); // Call handleSorting function from props
  };

  return (
    <FormControl fullWidth size='small'>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          
        }}
      >
        <Typography mr={1}>Sort by:</Typography>
        <Select
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '.MuiInputBase-input': {
              padding: 0,
            },
          }}
          value={selected}
          onChange={handleFilterChange}
        >
          <MenuItem value='Price: Low-High'>Price: Low-High</MenuItem>
          <MenuItem value='Price: High-Low'>Price: High-Low</MenuItem>
          <MenuItem value='Name: A-Z'>Name: A-Z</MenuItem>
          <MenuItem value='Name: Z-A'>Name: Z-A</MenuItem>
          <MenuItem value='Newest'>Newest</MenuItem>
        </Select>
      </Box>
    </FormControl>
  );
}
