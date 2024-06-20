import Auth from '../auth/auth';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove token from local storage
    Auth.logout();

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });

    // send home
    navigate('/');
  };

  return { logout };
};
