import { useState, useContext } from 'react';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Box, Tabs, Tab } from '@mui/material';
import { categories } from '../../data/itemData';

function CategorySelection() {
  // Context
  const { handleCategoryChange } = useContext(CategoryContext);

  // States
  const [value, setValue] = useState(0);

  // onChange of category tab...
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      marginBottom={1}
      sx={{ bgcolor: 'primary.main' }}
    >
      <Tabs
        onChange={handleChange}
        value={value}
        indicatorColor='secondary.main'
        textColor='white.main'
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
        aria-label='scrollable force tabs'
      >
        {categories.map((category) => (
          <Tab
            color='white.main'
            key={category.id}
            label={category.name}
            sx={{ textTransform: 'none' }}
            onClick={() => handleCategoryChange(category.name)} // sets selectedCategory value, to be used via context
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategorySelection;
