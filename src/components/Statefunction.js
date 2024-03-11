import React from "react";
import contextObject from "../letsContext.js";
import { useContext } from "react";

function UserState() {
  console.log("we rrrrrrrrrrrrr iin userState ");
  const userAuth = useContext(contextObject);
  const testAns = userAuth.map((ans) => {
    console.log("these are ID's", ans.id);
    console.log("these are tags", ans.tag);
  });

  return <h1>arey miya {}</h1>;
}

export default UserState;
