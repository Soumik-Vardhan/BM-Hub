import React, { useState, useEffect, useContext } from "react";
import SignIn from "./signin"; // Assuming you have exported the SignIn component
import contextObject from "./letsContext.js";
function UserStatus() {
  const [usersData, setUsersData] = useState([]);
  // console.log("first inside verification.js");

  useEffect(() => {
    // Fetch user data from the server
    fetch("http://localhost:3000/elogin")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setUsersData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
      {/* <h1>
        inside verification userAuth is{" "}
        {userAuth.map((home) => {
          home.id;
          console.log("inide verificuth", home);
        })}
      </h1> */}
      <SignIn usersData={usersData} />
    </>
  );
}

export default UserStatus;
