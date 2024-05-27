import Auth from '../../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { vendor_Signup } from '../../utils/mutations';
import { useAuthContext } from '../useAuthContext';

export const useVendorSignup = () => {
    const [stateError, setStateError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    //  Mutation
    const [AddVendor, { error, loading, data }] = useMutation(vendor_Signup);

    const signup = async (formState) => {
        setIsLoading(true)
        setStateError(null)

        try {
            const { data } = await AddVendor({
            variables: formState,
            });
            
            // create new token
            Auth.login(data.AddVendor.token);
            
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