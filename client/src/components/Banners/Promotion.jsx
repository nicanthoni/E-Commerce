import { Box, Typography, Link, IconButton, Slide } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useEffect } from 'react';

export default function Promotion() {
  // Promotional Messages
  const promotionalMessages = [
    { message: 'Promotion 1' },
    { message: 'Promotion 2' },
    { message: 'Promotion 3' },
  ];

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [direction, setDirection] = useState('left');

  // Update message every 4 secs
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionalMessages.length);
      setSlideIn(true);
    }, 300); // Slide transition duration
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
  };

  return (
    <Box display='flex' alignItems='center' > 
      <IconButton onClick={handlePrev}>
        <ChevronLeftIcon sx={{ color: 'white.main' }} />
      </IconButton>
      <Box overflow="hidden" px={15}>
        <Slide in={slideIn} direction={direction}>
          <Box>
            <Typography padding={1.5} color='white.main' fontSize='small'>
              {promotionalMessages[currentIndex].message}{' '}
              <Link underline='always' color='white.main'>
                Click here!
              </Link>
            </Typography>
          </Box>
        </Slide>
      </Box>
      <IconButton onClick={handleNext}>
        <ChevronRightIcon sx={{ color: 'white.main' }} />
      </IconButton>
    </Box>
  );
}
