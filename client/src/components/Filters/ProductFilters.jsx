import { useState } from 'react';
import {
  Box,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import {
  getAverage,
  sortByPriceAsc,
  sortByPriceDesc,
} from '../../utils/filterPrice';

export default function Filters({ products }) {
  // States
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [priceFilter, setPriceFilter] = useState(products);

  // Set Category Filter
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Calculate average price
  const averagePrice = getAverage(products);
  // console.log('Average Price: ', averagePrice);

  // Sort items by price in ascending order
  const sortedItemsAsc = sortByPriceAsc(products);
  // console.log('Sorted Items (Ascending):', sortedItemsAsc);

  // Sort items by price in descending order
  const sortedItemsDesc = sortByPriceDesc(products);
  // console.log('Sorted Items (Descending):', sortedItemsDesc);

    // Set Price Filter
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    console.log('Filtered items by price: ', products)
  };

  return (
    <Stack direction='row' spacing={4} justifyContent='center'>
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
        <FormControl fullWidth size='small'>
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
  );
}
