import { Paper, InputBase, IconButton } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
  const [search, setSearch] = useState({ search:''}) 

  // onChange - update search state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  // handle Search
  const handleSearch = () => {
    console.log('Searched for: ', search)
  }



  return (
    <Paper
    component='form'
    sx={{ display: 'flex',  marginY: 1, width: { sm: '100%', md: '50%'} }}
  >

      {/* Input field */}
      <InputBase
        onChange={handleChange}
        sx={{ ml: 2, flex: 1 }}
        placeholder='Search Products'
        inputProps={{ 'aria-label': 'search' }}
        name='search'
      />

      {/* Search button */}
      <IconButton 
      onClick={handleSearch}
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

  </Paper>
  );
}
