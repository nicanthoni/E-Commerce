import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

// Custom Hook to provide authContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // confirms we are not using this outside of the root app component
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context
};
