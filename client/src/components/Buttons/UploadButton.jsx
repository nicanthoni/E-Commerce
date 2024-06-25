import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadButton({ onChange }) {
  return (
    <Button
      component='label'
      variant='contained'
      color='secondary'
      startIcon={<CloudUploadIcon />}
      sx={{
        color: 'primary.main',
        textTransform: 'none',
      }}
    >
      Upload image
      <VisuallyHiddenInput
        type='file'
        accept='image/*'
        name='uploaded_item'
        onChange={onChange}
      />
    </Button>
  );
}
 