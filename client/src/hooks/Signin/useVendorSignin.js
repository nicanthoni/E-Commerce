import Auth from '../../auth/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { vendor_Login } from '../../graphql/mutations';
import { useAuthContext } from '../useAuthContext';

export const useVendorSignin = () => {
  const [stateError, setStateError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  //  Mutation
  const [VendorLogin, { error, loading, data }] = useMutation(vendor_Login);

  const signin = async (formState) => {
    setIsLoading(true);
    setStateError(null);

    try {
      const { data } = await VendorLogin({
        variables: formState,
      });

      // console.log('VendorLogin response data:', data);
      // login with users token
      Auth.login(data.Vendorlogin.token);

      // update the auth context
      dispatch({ type: 'LOGIN', payload: data });

      setIsLoading(false);

      return true; // Indicate a successful login
    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error('VendorLogin error in useVendorSignin() hook: ', e);
      return false; // Indicate a failed login
    }
  };
  return { signin, isLoading, stateError };
};
