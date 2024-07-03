import { useTheme } from '@mui/material/styles';
import { Box, Tabs, Tab } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { categories } from '../../data/itemData';

function CategorySelection({ selectedCategory, onCategoryChange, activeStep }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mediaQuery hook for mobile/sm size

  return (
    <Box
      display='flex'
      justifyContent='center'
      marginBottom={1}
      sx={{ bgcolor: 'primary.main' }}
      index={activeStep}
    >
      <Tabs
        indicatorColor='secondary.main'
        textColor='white.main'
        value={activeStep}
        index={activeStep}
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
        aria-label='scrollable force tabs'
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            label={category.name}
            sx={{ textTransform: 'none' }}
            onClick={() => onCategoryChange(category.name)}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategorySelection;
