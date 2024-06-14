import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { useState, useRef, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const inputRef = useRef()
  

  // Only updte list of filtered items, when products or query parameters change
  // Check if any of the products match the search query
  const filteredProducts = useMemo (() => {
    return products.filter(product => {
    return product.toLowerCase().includes(query.toLowerCase())
    })
  },[products, query])


  // handle Search
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Searched for: ', query)
    const searchValue = inputRef.current.value
    if (searchValue === '') return
    setProducts(prev => {
      return[...prev, searchValue]
    })
    setQuery('') // clear search bar
    inputRef.current.value = ''
  }


  return (
    <Paper
    component='form'
    sx={{ display: 'flex',  marginY: 1, width: { sm: '100%', md: '50%'} }}
  >

      {/* Input field */}
      <InputBase
        type='search'
        onChange={e => setQuery(e.target.value)}
        value={query} // Bind search state to input value
        sx={{ ml: 2, flex: 1 }}
        placeholder='Search Products'
        inputProps={{ 'aria-label': 'search' }}
        name='search'
        inputRef={inputRef} // Assign inputRef to the InputBase component
      />


      {/* Search button */}
      <IconButton 
      onClick={handleSubmit} // submit search
      aria-label='search'
      type='button'
      bgcolor='secondary' 
      sx={{ borderRadius: 1, p: '10px', 
      bgcolor: 'secondary.main', '&:hover': {
      bgcolor: 'secondary.main', // Maintain bgcolor on hover
      }, 
      }} 
      >
        <SearchIcon />
      </IconButton>

      {/* Returned products */}
      {/* <Box>
        {filteredProducts.map((product, index) => (
          <div key={index}>{product}</div>
        ))}
      </Box> */}
  </Paper>
  );
}
