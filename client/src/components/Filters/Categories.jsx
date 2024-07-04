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
    <Box display='flex' justifyContent='center'>
      <Tabs
        onChange={handleChange}
        value={value}
        indicatorColor='secondary'
        textColor='white'
        variant='scrollable'
        allowScrollButtonsMobile
      >
        {categories.map((category) => (
          <Tab
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
