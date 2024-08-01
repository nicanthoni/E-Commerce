import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import { formatDate } from '../../utils/formatters/formatDate';
import { Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Created for mobile view only (desktop view shows this data without need for mobile)
export default function ProductReviewModal(props) {
  const [button, setButton] = useState('edit');
  const [showInput, setShowInput] = useState(false);

  // handle edit review
  const handleEditReview = () => {
    setButton('save');
    setShowInput(true);
  };

  // handle saving edited review
  const handleSaveEdit = () => {
    setShowInput(false);
  };

  return (
    <>
      <Dialog open={props.modalState} onClose={props.onClose}>
        <DialogActions>
          <IconButton
            onClick={button === 'edit' ? handleEditReview : handleSaveEdit}
          >
            {button === 'edit' ? <EditIcon /> : <SaveIcon />}
          </IconButton>
        </DialogActions>

        <Box component='form' textAlign='center' p={2}>
          {!showInput ? (
            <Typography variant='body2'>"{props.review}"</Typography>
          ) : (
            <TextField
              id='edit-review'
              variant='standard'
              label='Edit Review'
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}
Box;
