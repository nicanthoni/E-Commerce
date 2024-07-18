import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products } from '../../graphql/queries';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  // States
  const [selectedItem, setSelectedItem] = useState(-1); // item selected by keyboard action
  const [searchData, setSearchData] = useState([]); // data fetched via query
  const [search, setSearch] = useState(''); // typed value in input field

  // Load Products  - passing no variables returns ALL products
  const [loadProducts, { loading, data, error, refetch: refetchProducts }] =
    useLazyQuery(Products, {
      variables: {},
    });

  // handleChange - setSearch euqal to typed input value
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // handleKeyDown - setSelectedItem based on keyboard action; open in new tab on 'enter'
  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === 'ArrowUp' && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === 'ArrowDown' &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === 'Enter' && selectedItem >= 0) {
        window.open(`/product/${searchData[selectedItem]._id}`);
      } else {
        setSelectedItem(-1);
      }
    }
  };

  // Effect - when input value is provided, query products data and filter the data for products that include typed value
  useEffect(() => {
    if (search !== '') {
      loadProducts().then((response) => {
        const filteredData = response.data.filterItems.filter((product) => {
          return product.name.toLowerCase().includes(search.toLowerCase());
        });
        setSearchData(filteredData);
        // console.log('searchData: ', searchData);
      });
    } else {
      setSearchData([]);
    }
  }, [search, loadProducts]);

  // handleSubmit - INACTIVE (eventually will load products on explore page that match some criteria)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      position='relative'
      display='flex'
      justifyContent='center'
      sx={{ width: { xs: '100%', md: '90%', lg: '70%' } }}
    >
      <Paper
        component='form'
        sx={{
          display: 'flex',
          width: '100%',
          borderRadius: 6,
        }}
      >
        {/* Search button */}
        <IconButton
          onClick={{ handleSubmit }} // submit search
          aria-label='search'
          type='button'
          bgcolor='secondary'
          sx={{
            borderRadius: 6,
            p: '10px',

            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
        >
          <SearchIcon />
        </IconButton>

        {/* Input */}
        <InputBase
          type='search'
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={search} // Bind search state to input value
          sx={{ flex: 1, pr: 3 }}
          placeholder='Search Products...'
          inputProps={{ 'aria-label': 'search' }}
          name='search'
        />
      </Paper>

      {/* Filtered Results - display null if no matches */}
      {search !== '' && searchData.length > 0 ? (
        <Box
          position='absolute'
          top='100%'
          width='90%'
          bgcolor='white.main'
          display='flex'
          flexDirection='column'
          pb={1}
          zIndex={100}
          boxShadow={2}
        >
          {searchData.slice(0, 10).map(
            (data, index) =>
              data.name && (
                <Typography
                  pl={2}
                  pt={1}
                  key={index}
                  sx={{
                    backgroundColor:
                      selectedItem === index
                        ? 'background.default'
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  <Link
                    color='black'
                    target='_blank'
                    href={`/product/${data._id}`}
                    underline='hover'
                  >
                    {data.name}
                  </Link>
                </Typography>
              )
          )}
        </Box>
      ) : null}
    </Box>
  );
}
