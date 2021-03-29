import { createContext, useState, useEffect } from "react";

export default ({ children }) => {
  const [authStateContext, setAuthStateContext] = useState({
    username: '',
    email:'',
    isLoggedIn: false
  });

  const logoutContext = () =>{
    localStorage.removeItem("USER");
    localStorage.removeItem("IS_LOGGED_IN");
    setAuthStateContext({
      username: "",
      email: "",
      isLoggedIn: false,
    });
  }

  const storeLoggedIn =  localStorage.getItem('IS_LOGGED_IN') == 'true';
  useEffect(() => {
    if(storeLoggedIn){
      const storeUser = JSON.parse(localStorage.getItem('USER'));
      setAuthStateContext({
        ...authStateContext,
        ...storeUser 
      })
    }

  },[])

  return (
    <AuthContext.Provider
      value={[authStateContext, setAuthStateContext, logoutContext]}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();
