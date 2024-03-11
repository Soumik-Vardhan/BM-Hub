import React from "react";
import { createContext, useState, useEffect } from "react";
//create a conextObject
const contextObject = createContext();
//then create context provider too
export const OurContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState([]);
  useEffect(() => {
    // Fetch user data from the server
    fetch("http://localhost:3000/e_tag")
      .then((response) => response.json())
      .then((data) => {
        setUserAuth(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <contextObject.Provider value={userAuth}>{children}</contextObject.Provider>
  );
};

export default contextObject;
