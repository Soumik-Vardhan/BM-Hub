import React from "react";
import MangCard from "./MangCard";
import { OurAnswer } from "../managerContext";
import { Link } from "react-router-dom";

function ManagerDashBoard() {
  let { isManager } = OurAnswer();
  const { userIdContext } = OurAnswer();
  console.log("we r in manager and printn the state of user", { isManager });
  console.log("printing userId in MangerDashboard", userIdContext);
  return (
    <>
      <Link to="/mexplore">explore</Link>
      <Link to="contactus">Conatct us</Link>
      <Link to="profile">Profile</Link>
      <div>this is your place to find the best profiles</div>;
      <MangCard />
    </>
  );
}

export default ManagerDashBoard;
