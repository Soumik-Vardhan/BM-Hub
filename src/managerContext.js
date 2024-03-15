import React from "react";
import { createContext, useContext, useState } from "react";
const ManagerContextObject = createContext();
export let OurAnswer = () => useContext(ManagerContextObject);

export const ManagerProvider = ({ children }) => {
  let [isManager, setIsManager] = useState(false);
  const [userIdContext,setUserIdContext] = useState("");
  return (
    <ManagerContextObject.Provider
      value={{
        isManager,
        setIsManager,
        userIdContext,
        setUserIdContext
      }}
    >
      {children}
    </ManagerContextObject.Provider>
  );
};

export default ManagerContextObject;
