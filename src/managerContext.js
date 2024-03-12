import React from "react";
import { createContext, useContext, useState } from "react";
const ManagerContextObject = createContext();
export let OurAnswer = () => useContext(ManagerContextObject);

export const ManagerProvider = ({ children }) => {
  let [isManager, setIsManager] = useState(false);
  return (
    <ManagerContextObject.Provider value={{ isManager, setIsManager }}>
      {children}
    </ManagerContextObject.Provider>
  );
};

export default ManagerContextObject;
