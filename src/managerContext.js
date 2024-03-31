import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
const ManagerContextObject = createContext();
export const OurAnswer = () => useContext(ManagerContextObject);

export const ManagerProvider = ({ children }) => {
  const [isManager, setIsManager] = useState(() => {
    const storedIsManager = localStorage.getItem("isManager");
    return storedIsManager ? JSON.parse(storedIsManager) : false;
  });
  const [userIdContext, setUserIdContext] = useState("");

  useEffect(() => {
    localStorage.setItem("isManager", JSON.stringify(isManager));
  }, [isManager]);
  return (
    <ManagerContextObject.Provider
      value={{
        isManager,
        setIsManager,
        userIdContext,
        setUserIdContext,
      }}
    >
      {children}
    </ManagerContextObject.Provider>
  );
};

export default ManagerContextObject;
