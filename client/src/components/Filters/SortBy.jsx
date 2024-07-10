import React, { useContext, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SortProductsContext } from '../../contexts/SortContext';

export default function SortBy({ isMobile }) {
  // Mobile check

  return isMobile ? <SortByMobile /> : <SortByDesktop />;
}

// MOBILE
function SortByMobile() {
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

//  DESKTOP / non-mobile
function SortByDesktop() {
  // Contexts
  const { handleSortByChange, selectedSortBy } =
    useContext(SortProductsContext);

  // States
  const [alphabetizeOpen, setAlphabetizeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const handlePriceClick = () => {
    setPriceOpen(!priceOpen);
  };

  const handleAlphabetizeClick = () => {
    setAlphabetizeOpen(!alphabetizeOpen);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.currentTarget.getAttribute('value');
    handleSortByChange(selectedFilter); // Call handleSorting function from context
    // console.log('Selected Filter :', selectedFilter);
  };

  return (
    <Box display='flex'>
      <List
        sx={{ bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Sort by: {selectedSortBy}
          </ListSubheader>
        }
      >
        {/* Newest */}
        <ListItemButton value='Newest' onClick={handleFilterChange}>
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
            <ListItemButton
              value='Price: Low-High'
              onClick={handleFilterChange}
              sx={{ pl: 2 }}
            >
              <ListItemIcon>
                <ArrowDownwardIcon />
              </ListItemIcon>
              <ListItemText primary='Low to High' />
            </ListItemButton>
            <ListItemButton
              value='Price: High-Low'
              onClick={handleFilterChange}
              sx={{ pl: 2 }}
            >
              <ListItemIcon>
                <ArrowUpwardIcon />
              </ListItemIcon>
              <ListItemText primary='High to Low' />
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
            <ListItemButton
              value='Name: A-Z'
              onClick={handleFilterChange}
              sx={{ pl: 2 }}
            >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary='A - Z' />
            </ListItemButton>
            <ListItemButton
              value='Name: Z-A'
              onClick={handleFilterChange}
              sx={{ pl: 2 }}
            >
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
