import React from "react";
import { OurAnswer } from "../managerContext";
import EmpCard from "./EmpCard";
import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";
//we need to check whether if his tech stack is empty or not, if it s empty then we need to provide the link where he can edit the techstack
function EmpDashBoard() {
  let { isManager } = OurAnswer();
  const { userIdContext } = OurAnswer();
  console.log("we r in explore and printn the state of user", { isManager });
  console.log("printing userId in empDashboard", userIdContext);
  return (
    <>
      <EmpCard value={userIdContext} />
    </>
  );
}
export default EmpDashBoard;
