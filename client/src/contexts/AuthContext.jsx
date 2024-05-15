import { createContext, useReducer } from 'react';

// Context
export const AuthContext = createContext(); 

// Reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// custom component to wrap entire root app and provide the state value from context to entire application
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null // when user first loads a website, they're generally not logged in
  });

  console.log('AuthContext state: ', state)
  
  return (
    // ...state represents 'user' property from AuthContextProvider. Using spread to account for future additional properties
    <AuthContext.Provider value={{...state, dispatch}}>
        { children }
    </AuthContext.Provider>
  )
};
