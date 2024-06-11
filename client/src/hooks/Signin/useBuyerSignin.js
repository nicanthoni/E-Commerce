import Auth from '../../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { buyer_login } from '../../utils/mutations';
import { useAuthContext } from '../useAuthContext';

export const useBuyerSignin = () => {
const [stateError, setStateError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const {dispatch} = useAuthContext()
const navigate = useNavigate()

//  Mutation
const [LoginUser, { error, loading, data }] = useMutation(buyer_login);

const signin = async (formState) => {
  setIsLoading(true)
  setStateError(null)

  try {
    const { data } = await LoginUser({
    variables: formState,
    });
    
    // login with users token
    Auth.login(data.Userlogin.token);
    
    // update the auth context
    dispatch({ type: 'LOGIN', payload: data })

    setIsLoading(false)

    
    return true; // Indicate a successful login


    } catch (e) {
        setStateError(true)
        setIsLoading(false)
        console.error('LoginUser error in useSignin() hook: ', e);
        return false; // Indicate a failed login
    }
        
}
return { signin, isLoading, stateError }
}