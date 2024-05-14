import { createContext,  useState } from "react";
import Auth from "../utils/auth";

// create context
export const AuthContext = createContext(); 


// custom component to wrap entire root app and provide value from context to entire application
export const AuthContextProvider = ({ children }) => {
    
const [user, setUser] = useState(null);

const login = (userData) => {
  setUser(userData)
};
const logout = () => {
  setUser(null);
}

console.log('AuthContext: ', user)
  
  return (
    <AuthContext.Provider value={{user, login, logout }}>
        { children }
    </AuthContext.Provider>
  )
};
