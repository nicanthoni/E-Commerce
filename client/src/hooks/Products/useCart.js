import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  add_cart,
  delete_cart,
  increase_quantity,
  decrease_quantity,
} from '../../graphql/mutations';

export const useCart = (refetch) => {
  const [stateError, setStateError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  Add/Delete Mutations
  const [AddToCart, { error: addError, loading: addLoading, data: addData }] =
    useMutation(add_cart);

  const [
    DeleteFromCart,
    { error: removeError, loading: removeLoading, data: removeData },
  ] = useMutation(delete_cart);

  //Increase/Decrease Mutations
  const [
    IncreaseItemQuant,
    { error: increaseError, loading: increaseLoading, data: increaseData },
  ] = useMutation(increase_quantity);
  const [
    DecreaseItemQuant,
    { error: decreaseError, loading: decreaseLoading, data: decreaseData },
  ] = useMutation(decrease_quantity);

  // ADD to cart
  const addCart = async (itemId, userId) => {
    setIsLoading(true);
    setStateError(null);

    try {
      await AddToCart({
        variables: { itemId, userId },
      });

      setIsLoading(false);
    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('addCart error in useCart() hook: ', e);
    }
  };

  // DELETE from cart
  const deleteCart = async (itemId, userId) => {
    setIsLoading(true);
    setStateError(null);

    try {
      await DeleteFromCart({
        variables: { itemId, userId },
      });

      setIsLoading(false);
    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('deleteCart error in useCart() hook: ', e);
    }
  };

  // INCREASE quantity of item in cart
  const increaseQuantity = async (itemId, userId) => {
    setIsLoading(true);
    setStateError(null);

    try {
      await IncreaseItemQuant({
        variables: { itemId, userId },
      });
      setIsLoading(false);
    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('increaseQuantity error in useCart() hook: ', e);
    }
  };

  // DECREASE quantity of item in cart
  const decreaseQuantity = async (itemId, userId) => {
    setIsLoading(true);
    setStateError(null);

    try {
      await DecreaseItemQuant({
        variables: { itemId, userId },
      });
      setIsLoading(false);
    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('decreaseQuantity error in useCart() hook: ', e);
    }
  };

  return {
    addCart,
    deleteCart,
    increaseQuantity,
    decreaseQuantity,
    isLoading,
    stateError,
  };
};
