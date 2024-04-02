import React from "react";
import MangCard from "./MangCard";
import { OurAnswer } from "../managerContext";
import { Link } from "react-router-dom";
import "../styles/ManagerDashBoard.css";
function ManagerDashBoard() {
  let { isManager } = OurAnswer();
  const { userIdContext } = OurAnswer();

  return (
    <div className="manager-dashboard">
      {/* <Link to="/mexplore">explore</Link> */}
      {/* <Link to="contactus">Conatct us</Link>
      // <Link to="profile">Profile</Link> */}
      {/* <div>this is your place to find the best profiles</div>; */}
      <MangCard prop={userIdContext} />
    </div>
  );
}

export default ManagerDashBoard;
