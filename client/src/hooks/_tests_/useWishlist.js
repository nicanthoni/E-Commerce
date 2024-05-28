import Auth from '../../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { add_wishlist } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../useAuthContext';



export const useWishlist = () => {
    const { user } = useAuthContext()
    const [stateError, setStateError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const {dispatch} = useAuthContext()
    // const navigate = useNavigate()


    //  Mutation
    const [AddToWishlist, { error, loading, data }] = useMutation(add_wishlist);
    

    const addWishlist = async (itemId, userId) => {
        setIsLoading(true)
        setStateError(null)

        try {
            const { data } = await AddToWishlist({
            variables: itemId, userId
            });
            
            // // login with users token
            // Auth.login(data.Userlogin.token);

            setIsLoading(false)


      } catch (e) {
            setStateError(true)
            setIsLoading(false)
            console.error('addWishlist error in useWishlist() hook: ', e);
      }
         
    }
    return { addWishlist, isLoading, stateError }
}