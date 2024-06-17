import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useLogout } from '../../hooks/useLogout';
import DeleteUserAlert from '../Alerts/Auth/DeleteUser';
import { delete_user } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';


export default function DeleteAccount({ userId }) {

  // states
  const [showDeletionAlert, setShowDeletionAlert] = useState(false); // alert after deletion
  const [promptConfirmation, setPromptConfirmation] = useState(false) //  confirmation prompt

  // hooks
  const { logout } = useLogout();

  // Mutation
  const [DeleteUser, { loading, data, error }] = useMutation(delete_user);
 
  // OnClick Button click - show confirmation prompt
  const handleConfirmation = () => {
    setPromptConfirmation(true);
  }       
  
  // OnClose - close confirmation prompt
  const handleClose = () => {
    setPromptConfirmation(false)
  }

  // OnClick - Delete account and logout
  const handleDeleteAccount = async () => {
    try {
      await DeleteUser({ variables: { userId } }); // delete user
      setShowDeletionAlert(true); // show successful deletion alert
      setTimeout(() => {
        setShowDeletionAlert(false); // hide alert
        logout(); // call logout() hook
      }, 2000);
    } catch (e) {
      console.log('User Deletion error: ', e);
    }
  };

  return (
    <>
      <Button
        onClick={handleConfirmation}
        variant='contained'
        color='error'
        sx={{
          color: 'white',
          textTransform: 'none',
          maxWidth: 140,
        }}
      >
        Delete Account
      </Button>

      {/* Deletion Confirmation */}
      <Dialog
        open={promptConfirmation}
        onClose={handleClose}
        >

        <DialogTitle>
            {'Delete account and associated data?'}
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                By proceeding to delete, you authorize the deletion of all of your account data. This cannot be undone.
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button variant='contained' color='grey' onClick={handleClose} 
            sx={{ textTransform: 'none', backgroundColor: 'white', color: 'primary.main' }}>
                Nevermind
            </Button>

            <Button variant='contained' onClick={() => handleDeleteAccount()} color='error' 
            sx={{ textTransform: 'none' }}>
                Delete
            </Button>

        </DialogActions>
      </Dialog>

      {/* Alert - visibility controlled by local state */}
      <DeleteUserAlert visible={showDeletionAlert} />
    </>
  );
}
