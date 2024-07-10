import { useState } from 'react';
import { Box } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { SortProductsContext } from '../../contexts/SortContext';


export default function SortByDesktop({ refetchProducts, selectedCategory }) {
  // States
  const [filter, setFilter] = useState('');
  const [alphabetizeOpen, setAlphabetizeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const handlePriceClick = () => {
    setPriceOpen(!priceOpen);
  };

  const handleAlphabetizeClick = () => {
    setAlphabetizeOpen(!alphabetizeOpen);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    handleSorting(selectedFilter); // Call handleSorting function from props
  };

  // Effect
  useEffect(() => {
    refetchProducts();
  }, [selectedCategory]);

  return (
    <Box display='flex'>
      <List
        value={filter}
        onClick={handleFilterChange}
        sx={{ bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Sort Products
          </ListSubheader>
        }
      >
        {/* Newest */}
        <ListItemButton value='Newest'>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary='Newest' />
        </ListItemButton>

        {/* Price */}
        <ListItemButton onClick={handlePriceClick}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary='Price' />
          {priceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Price - collapsable items */}
        <Collapse in={priceOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton value='Price: Low-High' sx={{ pl: 2 }}>
              <ListItemIcon>
                <ArrowDownwardIcon />
              </ListItemIcon>
              <ListItemText primary='High to Low' />
            </ListItemButton>
            <ListItemButton value='Price: High-Low' sx={{ pl: 2 }}>
              <ListItemIcon>
                <ArrowUpwardIcon />
              </ListItemIcon>
              <ListItemText primary='Low to High' />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Alphabetize */}
        <ListItemButton onClick={handleAlphabetizeClick}>
          <ListItemIcon>
            <SortByAlphaIcon />
          </ListItemIcon>
          <ListItemText primary='Alphabetize' />
          {alphabetizeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Alphabetical - collapsable items */}
        <Collapse in={alphabetizeOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton value='Name: A-Z' sx={{ pl: 2 }}>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary='A - Z' />
            </ListItemButton>
            <ListItemButton value='Name: Z-A' sx={{ pl: 2 }}>
              <ListItemIcon>
                <ArrowBackIcon />
              </ListItemIcon>
              <ListItemText primary='Z - A' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
