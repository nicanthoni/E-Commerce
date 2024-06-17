import { Button } from '@mui/material'
import { useState } from 'react'
import { useLogout } from '../../../hooks/useLogout'
import DeleteUserAlert from '../../Alerts/Auth/DeleteUser'
import { delete_user } from '../../../utils/mutations'
import { useMutation } from '@apollo/client'



export default function DeleteAccount ({ userId }) {
    const [showDeletionAlert, setShowDeletionAlert] = useState(false); 
    const { logout } = useLogout();

    // Mutation
    const [DeleteUser, { loading, data, error}] = useMutation(delete_user)

    // OnClick - Delete account and logout
    const handleDeleteAccount = async () => {
        try {
            await DeleteUser({variables: {userId}}) // delete user
            setShowDeletionAlert(true); // show successful deletion alert
            setTimeout(() => { 
                setShowDeletionAlert(false) // hide alert
                logout() // call logout() hook
            }, 2000);
            } catch (e) {
            console.log('User Deletion error: ', e);
        }}

    return (
        <>
        <Button
            onClick={() => handleDeleteAccount()}
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

        {/* Alert to go below - visibility controlled by local state */}
            <DeleteUserAlert visible={showDeletionAlert}/>
        </>
    )
}