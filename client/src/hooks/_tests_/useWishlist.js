import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { add_wishlist } from '../../utils/mutations';
import { useAuthContext } from '../useAuthContext';



export const useWishlist = () => {
const { user } = useAuthContext()
const [stateError, setStateError] = useState(null)
const [isLoading, setIsLoading] = useState(null)


//  Mutation
const [AddToWishlist, { error, loading, data }] = useMutation(add_wishlist);


const addWishlist = async (itemId, userId) => {
    setIsLoading(true)
    setStateError(null)

    try {
        await AddToWishlist({
        variables: {itemId, userId}
        });

        setIsLoading(false)

    } catch (e) {
        setStateError(true)
        setIsLoading(false)
        console.error('addWishlist error in useWishlist() hook: ', e);
    }
        
}
return { addWishlist, isLoading, stateError }
}