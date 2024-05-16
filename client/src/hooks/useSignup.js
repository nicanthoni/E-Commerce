import Auth from '../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { buyer_Signup } from '../utils/mutations';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [stateError, setStateError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    //  Mutation
    const [AddUser, { error, loading, data }] = useMutation(buyer_Signup);

    const signup = async (formState) => {
        setIsLoading(true)
        setStateError(null)

        try {
            const { data } = await AddUser({
            variables: formState,
            });
    
            Auth.login(data.AddUser.token);
            
            // update the auth context
            dispatch({ type: 'LOGIN', payload: data })

            setIsLoading(false)

            // send to users profile
            setTimeout(() => {
                navigate('/profile');
                }, 1500);

      } catch (e) {
            setStateError(true)
            setIsLoading(false)
            console.error('AddUser error in useSignup() hook:', e);
      }
         
    }
    return { signup, isLoading, stateError }
}