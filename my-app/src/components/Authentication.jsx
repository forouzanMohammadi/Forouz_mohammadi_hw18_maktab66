import React, { useState, createContext } from "react";


export const Authentication = createContext({  });

const AuthenticationUser = ({ children }) => {

  const [islogin, setIslogin] = useState(false);
  const [user,setUser] = useState("")
 
  return <Authentication.Provider value={{user,setUser ,islogin ,setIslogin}}>
    {children}
    </Authentication.Provider>;
};
export default AuthenticationUser;
