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
        
        Auth.login(data.AddVendor.token); // create new token
        
        dispatch({ type: 'LOGIN', payload: data }) // update the auth context

        setIsLoading(false)

        return true; // Indicate a successful registration

      } catch (e) {
            setStateError(true)
            setIsLoading(false)
            console.error('AddUser error in useSignup() hook:', e);
            return false; // Indicate a failed registration
      }
         
    }
    return { signup, isLoading, stateError }
}