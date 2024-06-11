import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { add_cart , delete_cart} from '../../utils/mutations';


export const useCart = (refetch) => {
const [stateError, setStateError] = useState(null)
const [isLoading, setIsLoading] = useState(null)

//  Mutations
const [AddToCart, {  error: addError, loading: addLoading, data: addData }] = useMutation(add_cart);
const [DeleteFromCart, { error: removeError, loading: removeLoading, data: removeData }] = useMutation(delete_cart);


// ADD to cart
const addCart = async (itemId, userId) => {
    setIsLoading(true)
    setStateError(null)

    try {
        await AddToCart({
        variables: {itemId, userId}
        });

        setIsLoading(false)
        refetch(); // Re-fetch data after successful mutation

    } catch (e) {
        setStateError(true)
        setIsLoading(false)
        console.error('addCart error in useCart() hook: ', e);
    }
        
};

 // DELETE from cart
 const deleteCart = async (itemId, userId) => {
    setIsLoading(true);
    setStateError(null);

    try {
      await DeleteFromCart({
        variables: { itemId, userId }
      });

      setIsLoading(false);
      setTimeout(() => {
        refetch(); // Re-fetch data after successful mutation
      }, 1900);
      

    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('deleteCart error in useCart() hook: ', e);
    }
  };


return { addCart, deleteCart, isLoading, stateError }
}