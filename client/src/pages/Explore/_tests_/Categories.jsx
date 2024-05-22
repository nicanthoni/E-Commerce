import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Paper, Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { useMediaQuery } from '@mui/material';

// Categories
const categories = [
  { id: 1, name: 'Mens Apparel' },
  { id: 2, name: 'Womens Apparel' },
  { id: 3, name: 'Sports & Outdoors' },
  { id: 4, name: 'Kids' },
  { id: 5, name: 'Baby Care' },
  { id: 6, name: 'Home Decor' },
  { id: 7, name: 'Art' },
  { id: 8, name: 'Gaming' },
  { id: 9, name: 'Office' },
];

function CategorySelection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mediaQuery hook for mobile/sm size
  const [activeStep, setActiveStep] = useState(0);

  // Carousel settings
  const categoriesPerView = isMobile ? 1 : 3; // Adjust categories per view based on mobile
  const maxSteps = Math.ceil(categories.length / categoriesPerView);

  // Next button
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Back button
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Set active
  const handleStepChange = (step) => {
    console.log('Step: ', step)
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 1200, flexGrow: 1, overflow: 'hidden', mx: 'auto' }}>
      <Paper
        square
        border
        elevation={0}
        sx={{
          
          height: 50,
          pl: 2,
        }}
      />

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ height: '300px' }} 
        containerStyle={{ height: '300px' }} 
      >
        {Array.from({ length: maxSteps }).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {categories.slice(index * categoriesPerView, (index + 1) * categoriesPerView).map((category) => (
              <Button
                color='primary'
                variant='contained'
                key={category.id}
                sx={{
                  height: 255,
                  width: '90%',
                  mx: 1,
                  bgcolor: 'primary.main',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'secondary.main',
                  textAlign: 'center',
                  lineHeight: '255px',
                  fontSize: '1.5rem',
                }}
                onClick={() => console.log('Category clicked: ', category.name)}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        ))}
      </SwipeableViews>

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
            Next
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
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default CategorySelection;
