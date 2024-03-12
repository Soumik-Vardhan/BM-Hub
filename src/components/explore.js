import React from "react";
import ManagerContextObject from "../managerContext";
import { OurAnswer } from "../managerContext";

function Explore() {
  let { isManager } = OurAnswer();
  console.log("we r in explore and printn the state of user", { isManager });
  if (isManager) {
    console.log("yay");
  } else {
    console.log("naiiiii");
  }
  return <h1>we r in explore</h1>;
}

export default Explore;
