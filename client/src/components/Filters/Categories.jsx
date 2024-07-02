import { useTheme } from '@mui/material/styles';
import { Box, Button, MobileStepper, Tabs, Tab } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useMediaQuery } from '@mui/material';
import { categories } from '../../data/itemData';

function CategorySelection({
  selectedCategory,
  onCategoryChange,
  activeStep,
  onStepChange,
}) {
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
    <Box display='flex' justifyContent='center' marginBottom={1} sx={{ bgcolor: 'primary.main' }}>
    <Tabs
      sx={{ color: 'white.main' }}
      textColor='inherit'
      value={activeStep}
      onChange={onStepChange}
      variant='scrollable'
      scrollButtons='auto'
      allowScrollButtonsMobile
      aria-label='scrollable force tabs'
    >
      {categories.map((category) => (
        <Tab sx={{textTransform: 'none'}}color='white.main'key={category.id} label={category.name} />
      ))}
    </Tabs>
  </Box>
    // <Box
    //   marginBottom={1}
    //   sx={{
    //     maxWidth: 1200,
    //     flexGrow: 1,
    //     overflow: 'hidden',
    //     mx: 'auto',
    //     position: 'relative',
    //   }}
    // >
    //   <Box
    //     sx={{
    //       position: 'relative',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //   >
    //     {/* Back button - only on mobile */}
    //     {isMobile && (
    //       <Button
    //         size='small'
    //         onClick={handleBack}
    //         disabled={activeStep === 0}
    //         sx={{ position: 'absolute', left: -20, zIndex: 1 }} // Moved button further to the left
    //       >
    //         {theme.direction === 'rtl' ? (
    //           <KeyboardArrowRight />
    //         ) : (
    //           <KeyboardArrowLeft />
    //         )}
    //       </Button>
    //     )}

    //     <Box
    //       axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    //       index={activeStep}
    //       onChangeIndex={onStepChange}
    //       // enableMouseEvents  // Only worked with react-swipeable-views component
    //       style={{ flex: 1 }}
    //     >
    //       {/* Category Buttons */}
    //       {Array.from({ length: maxSteps }).map((_, index) => (
    //         <Box
    //           key={index}
    //           sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    //         >
    //           {categories
    //             .slice(
    //               index * categoriesPerView,
    //               (index + 1) * categoriesPerView
    //             )
    //             .map((category) => (
    //               <Button
    //                 size='small'
    //                 color={
    //                   selectedCategory === category.name
    //                     ? 'secondary'
    //                     : 'primary'
    //                 }
    //                 variant='text'
    //                 key={category.id}
    //                 sx={{
    //                   textWrap: 'nowrap',
    //                   mx: 1,
    //                   textAlign: 'center',
    //                   textTransform: 'none',
    //                 }}
    //                 onClick={() => onCategoryChange(category.name)}
    //               >
    //                 {category.name}
    //               </Button>
    //             ))}
    //         </Box>
    //       ))}
    //     </Box>

    //     {/* Next button - only on mobile*/}
    //     {isMobile && (
    //       <Button
    //         size='small'
    //         onClick={handleNext}
    //         disabled={activeStep === maxSteps - 1}
    //         sx={{ position: 'absolute', right: -20, zIndex: 1 }}
    //       >
    //         {theme.direction === 'rtl' ? (
    //           <KeyboardArrowLeft />
    //         ) : (
    //           <KeyboardArrowRight />
    //         )}
    //       </Button>
    //     )}
    //   </Box>

    //   {/* Stepper - only show on mobile */}
    //   {isMobile && (
    //     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
    //       <MobileStepper
    //         sx={{ p: 0 }} // removes white outline from stepper
    //         steps={maxSteps}
    //         position='static'
    //         activeStep={activeStep}
    //       />
    //     </Box>
    //   )}
    // </Box>
  );
}

export default CategorySelection;
