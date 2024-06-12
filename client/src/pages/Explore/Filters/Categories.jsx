import { useTheme } from '@mui/material/styles';
import { Box, Button, MobileStepper, Typography, Divider } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { useMediaQuery } from '@mui/material';


// Categories
const categories = [
  { id: 1, name: 'All Products' },
  { id: 2, name: 'Apparel' },
  { id: 3, name: 'Sports & Outdoors' },
  { id: 4, name: 'Kids' },
  { id: 5, name: 'Baby Care' },
  { id: 6, name: 'Home Decor' },
  { id: 7, name: 'Art' },
  { id: 8, name: 'Gaming' },
  { id: 9, name: 'Office' },
];

function CategorySelection({ selectedCategory, onCategoryChange, activeStep, onStepChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mediaQuery hook for mobile/sm size

  // Carousel settings
  const categoriesPerView = isMobile ? 3 : 9; // # of categories shown per view
  const maxSteps = Math.ceil(categories.length / categoriesPerView);

   // Next button
   const handleNext = () => {
    onStepChange(activeStep + 1);
  };

  // Back button
  const handleBack = () => {
    onStepChange(activeStep - 1);
  };

  
  return (
    <Box marginBottom={1} sx={{ maxWidth: 1200, flexGrow: 1, overflow: 'hidden', mx: 'auto' }} >

        {/* Component Header */}
        {/* <Box marginBottom={1} textAlign='center' >
            <Typography>Browse Categories</Typography>
        </Box>

        <Divider variant='middle'/> */}


      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={onStepChange}
        enableMouseEvents
      >
        
        {Array.from({ length: maxSteps }).map((_, index) => (
          
          <Box key={index} marginBottom={1} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {categories.slice(index * categoriesPerView, (index + 1) * categoriesPerView).map((category) => (
              <Button
                size='small'
                color={selectedCategory === category.name ? 'secondary' : 'primary'}
                variant='text'
                key={category.id}
                sx={{
                  textWrap: 'nowrap',
                  mx: 1,
                  textAlign: 'center',
                  // width: '100%',
                  // bgcolor: selectedCategory === category.name ? 'secondary.main' : 'primary.main',
                }}
                onClick={() => onCategoryChange(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        ))}
      </SwipeableViews>

       
       {/* Back & Next - only show on mobile */}
       {!isMobile ? (null) : (
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
        
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }

        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          
          </Button>
        }
      />
    )}
    </Box>
  );
}

export default CategorySelection;
