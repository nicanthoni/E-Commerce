import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { useState, useRef, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const inputRef = useRef();

  // Only updte list of filtered items, when products or query parameters change
  // Check if any of the products match the search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  // handle Search
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Searched for: ', query);
    const searchValue = inputRef.current.value;
    if (searchValue === '') return;
    setProducts((prev) => {
      return [...prev, searchValue];
    });
    setQuery(''); // clear search bar
    inputRef.current.value = '';
  };

  return (
    <Paper
      component='form'
      sx={{
        display: 'flex',
        width: { sm: '100%', md: '80%', lg: '50%' },
        borderRadius: 6,
      }}
    >
      {/* Search button */}
      <IconButton
        onClick={handleSubmit} // submit search
        aria-label='search'
        type='button'
        bgcolor='secondary'
        sx={{
          borderRadius: 6,
          p: '10px',

          '&:hover': {
            bgcolor: 'secondary.main', // Maintain bgcolor on hover
          },
        }}
      >
        <SearchIcon />
      </IconButton>

      {/* Input field */}
      <InputBase
        autoFocus
        type='search'
        onChange={(e) => setQuery(e.target.value)}
        value={query} // Bind search state to input value
        sx={{ flex: 1 }}
        placeholder='Search Products'
        inputProps={{ 'aria-label': 'search' }}
        name='search'
        inputRef={inputRef} // Assign inputRef to the InputBase component
      />
    </Paper>
  );
}
