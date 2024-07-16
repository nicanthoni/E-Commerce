import {
  Box,
  Typography,
  Link,
  IconButton,
  Slide,
  Zoom,
  Fade,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useEffect } from 'react';

export default function Promotion() {
  // Promotional Messages
  const promotionalMessages = [
    { message: 'Promotional offer ' },
    { message: 'Become a vendor ' },
    { message: 'Something else ' },
  ];

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [direction, setDirection] = useState('left');
  const [initialLoad, setInitialLoad] = useState(true);

  // Update message every 5 secs
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Next button
  const handleNext = () => {
    setDirection('left');
    setSlideIn(false);

    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % promotionalMessages.length
      );
      setSlideIn(true);
    }, 300); // Slide transition duration

    setInitialLoad(false);
  };

  // Previous button
  const handlePrev = () => {
    setDirection('right');
    setSlideIn(false);

    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + promotionalMessages.length) %
          promotionalMessages.length
      );
      setSlideIn(true);
    }, 300); // Slide transition duration

    setInitialLoad(false);
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={handlePrev}>
        <ChevronLeftIcon sx={{ color: 'white.main' }} />
      </IconButton>
      <Box overflow='hidden' px={10}>
        {initialLoad ? (
          <Fade in={true} timeout={600}>
            <Box>
              <Typography padding={1.5} color='white.main' fontSize='small' textAlign='center'>
                {promotionalMessages[currentIndex].message}{' '}
                <Link underline='always' color='white.main'>
                  here!
                </Link>
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Slide in={slideIn} direction={direction}>
            <Box>
              <Typography padding={1.5} color='white.main' fontSize='small' textAlign='center'>
                {promotionalMessages[currentIndex].message}{' '}
                <Link underline='always' color='white.main'>
                  here!
                </Link>
              </Typography>
            </Box>
          </Slide>
        )}
      </Box>
      <IconButton onClick={handleNext}>
        <ChevronRightIcon sx={{ color: 'white.main' }} />
      </IconButton>
    </Box>
  );
}
