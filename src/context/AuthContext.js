import { createContext, useState } from "react";

export default ({ children }) => {
  const [authStateContext, setAuthStateContext] = useState({
    username: '',
    email:'',
    isLoggedIn: false
  });
  return (
    <AuthContext.Provider value={[authStateContext, setAuthStateContext]}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();
