import React from "react";
import { OurAnswer } from "../managerContext";

function ContactUs() {
  let { userIdContext } = OurAnswer();
  const { isManager } = OurAnswer();

  console.log("in contack page", isManager);
  return <h1>we r in contact us</h1>;
}

export default ContactUs;
