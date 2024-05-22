import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {


  return (
    <Paper
    component="form"
    sx={{ display: 'flex',  marginY: 1, width: { sm: '100%', md: '50%'} }}
  >
    <InputBase
      sx={{ ml: 2, flex: 1 }}
      placeholder="Search Products"
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="button" bgcolor='secondary' sx={{ borderRadius: 1, p: '10px', bgcolor: 'secondary.main', '&:hover': {
      bgcolor: 'secondary.main', // Maintain the same background color on hover
    }, }} aria-label="search">

      <SearchIcon />
      
    </IconButton>
  </Paper>
  );
}
