import { useState, useContext } from 'react';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Box, Tabs, Tab } from '@mui/material';
import { categories } from '../../data/itemData';

function CategorySelection() {
  // Context
  const { handleCategoryChange } = useContext(CategoryContext);

  // State
  const [selected, setSelected] = useState(0);

  // onChange of tabs - set new state value & update selectedCategories value (context)
  const handleChange = (event, newValue) => {
    setSelected(newValue);
    handleCategoryChange(categories[newValue].name); // sets selectedCategory's value
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Tabs
        value={selected}
        onChange={handleChange}
        indicatorColor='secondary'
        textColor='white'
        variant='scrollable'
        allowScrollButtonsMobile
      >
        {categories.map((category, index) => (
          <Tab
            key={category.id}
            label={category.name}
            sx={{ textTransform: 'none' }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategorySelection;
