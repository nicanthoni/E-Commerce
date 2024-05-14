import { createContext, useReducer } from "react";

// create context
export const AuthContext = createContext(); 

// create reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      state;
  }
};

// custom component to wrap entire root app and provide the state value from context to entire application
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log('AuthContext state: ', state)
  
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        { children }
    </AuthContext.Provider>
  )
};
