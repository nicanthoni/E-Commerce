import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

export default function DeleteAccount({ onClick }) {
  const [promptConfirmation, setPromptConfirmation] = useState(false); //  confirmation prompt

  // onClick - show confirmation prompt
  const handleConfirmation = () => {
    setPromptConfirmation(true);
  };

  // onClose - close confirmation prompt
  const handleClose = () => {
    setPromptConfirmation(false);
  };

  return (
    <>
      <Button
        size='small'
        onClick={handleConfirmation}
        variant='text'
        color='error'
        sx={{
          textTransform: 'none',
          p: 0,
          fontWeight: 'bold',
        }}
      >
        Delete Account
      </Button>

      {/* Deletion Confirmation */}
      <Dialog open={promptConfirmation} onClose={handleClose}>
        <DialogTitle>{'Delete account and associated data?'}</DialogTitle>

        <DialogContent>
          <DialogContentText variant='caption' color='text.primary'>
            By proceeding to delete, you authorize the deletion of all of your
            account data. This cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant='contained'
            color='grey'
            onClick={handleClose}
            sx={{
              textTransform: 'none',
              backgroundColor: 'white.main',
              color: 'primary.main',
            }}
          >
            Nevermind
          </Button>

          <Button
            variant='contained'
            onClick={() => onClick()}
            color='error'
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
