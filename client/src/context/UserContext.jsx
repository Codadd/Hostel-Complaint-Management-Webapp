import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userName, setUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
