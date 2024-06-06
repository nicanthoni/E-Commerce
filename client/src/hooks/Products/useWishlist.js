import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { add_wishlist, delete_wishlist } from '../../utils/mutations';


export const useWishlist = (refetch) => {
const [stateError, setStateError] = useState(null)
const [isLoading, setIsLoading] = useState(null)

//  Mutations
const [AddToWishlist, {  error: addError, loading: addLoading, data: addData }] = useMutation(add_wishlist);
const [DeleteFromWishlist, { error: removeError, loading: removeLoading, data: removeData }] = useMutation(delete_wishlist);


// ADD item to wishlist
const addWishlist = async (itemId, userId) => {
    setIsLoading(true)
    setStateError(null)

    try {
        await AddToWishlist({
        variables: {itemId, userId}
        });

        setIsLoading(false)
        refetch(); // Re-fetch data after successful mutation

    } catch (e) {
        setStateError(true)
        setIsLoading(false)
        console.error('addWishlist error in useWishlist() hook: ', e);
    }
        
};

 // DELETE item from wishlist
 const deleteWishlist = async (itemId, userId) => {
    setIsLoading(true);
    setStateError(null);

    try {
      await DeleteFromWishlist({
        variables: { itemId, userId }
      });

      setIsLoading(false);
      setTimeout(() => {
        refetch(); // Re-fetch data after successful mutation
      }, 1900);
      

    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('deleteWishlist error in useWishlist() hook: ', e);
    }
  };


return { addWishlist, deleteWishlist, isLoading, stateError }
}