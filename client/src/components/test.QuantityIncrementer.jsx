import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, TextField, Stack } from '@mui/material';

const QuantityIncrementer = ({
  handleQuantIncrease,
  handleQuantDecrease,
  quantity,
}) => {
  return (
    <Stack direction='row' alignItems='center' gap={0.5}>
      {/* Decrease button */}
      <IconButton
        onClick={handleQuantDecrease}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 999,
          width: '24px',
          height: '24px',
          color: 'primary.main',
          bgcolor: '#fff',
          '&:hover': {
            bgcolor: 'primary.main', // Background color on hover
            color: '#fff',
          },
        }}
      >
        <RemoveIcon fontSize='small' />
      </IconButton>

      {/* Quantity Field */}
      <TextField
        size='small'
        value={quantity}
        variant='outlined'
        sx={{
          backgroundColor: '#fff',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
          },
          '&:hover .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main', // Border color on hover
            },
          },
        }}
        inputProps={{
          style: {
            textAlign: 'center',
            color: 'primary.main',
            padding: '4px 5px',
            width: '35px',
            height: '24px',
          },
        }}
      />

      {/* Increase button */}
      <IconButton
        onClick={handleQuantIncrease}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 999,
          width: '24px',
          height: '24px',
          color: 'primary.main',
          bgcolor: '#fff',
          '&:hover': {
            bgcolor: 'primary.main', // Background color on hover
            color: '#fff',
          },
        }}
      >
        <AddIcon fontSize='small' />
      </IconButton>
    </Stack>
  );
};

export default QuantityIncrementer;
