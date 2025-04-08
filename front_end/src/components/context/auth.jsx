import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["usertoken", "userfreshtoken"]);
  const [authed, setAuth] = useState(false);

  const logOut = () => {
    removeCookie("usertoken");
    setAuth(false);
  };


  const updateAuthenticationStatus = () => {
    setAuth(cookie.usertoken ? true : false);
  };

  const updateUserToken = (token) => {
    setCookie("usertoken", token);
  };

  

  return (
    <AuthContext.Provider
      value={{
        cookie,
        setCookie,
        removeCookie,
        updateAuthenticationStatus,
        updateUserToken,
        setAuth,
        logOut,
        authed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
