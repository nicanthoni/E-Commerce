import Auth from '../utils/auth';
import { createContext, useReducer, useEffect } from 'react';

// Context
export const AuthContext = createContext(); 


// Reducer - on Login, return {user} token and {type} for quick access to type of authenticated user
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, type: Auth.getProfile().data.userType}
    case 'LOGOUT':
      return { user: null, type: null };
    default:
      return state;
  }
};

// custom component to wrap entire root app and provide the state value from context to entire application
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, 
    type: null
  });

  // When app starts...
  useEffect(() => {
    const user = localStorage.getItem('id_token')
    // check local storage for user (loggedin), else dont dispatch 'LOGIN'
    if (user) {
      // console.log('User is logged in')
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])
  
  // console.log('AuthContext state: ', state)
  return (
    // ...state represents 'user' property from AuthContextProvider. Using spread to account for future additional properties
    <AuthContext.Provider value={{...state, dispatch}}>
        { children }
    </AuthContext.Provider>
  )
};