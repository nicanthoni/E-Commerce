import { Typography, Stack } from '@mui/material';
import GetStarted from '../../components/Buttons/GetStarted';

export default function HomeCTA() {
  return (
    <Stack direction='column' alignItems={'center'} padding={5} gap={2}>
      <Typography variant='h4' color='text.secondary'>
        The e-commerce experience for all
      </Typography>
      <Typography color='text.secondary'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolores
        molestiae accusamus maiores cumque.
      </Typography>
      <GetStarted />
    </Stack>
  );
}
