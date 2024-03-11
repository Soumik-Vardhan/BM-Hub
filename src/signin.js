import React from "react";
import Verify from "./veryify";
import { useContext } from "react";
import UserState from "./statefunction";
import contextObject from "./letsContext";

import UserStatus from "./verification";
function SignIn({ verify, usersData }) {
  const [formData, setFormData] = React.useState({
    userID: "",
    password: "",
  });
  const stateOfUser = false;
  const { userID, password } = formData;
  const userAuth = useContext(contextObject);
  const testAns = userAuth.map((ans) => {
    // console.log("in singinnnnnn these are ID's", ans.id);
    // console.log("these are tags", ans.tag);
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // console.log(evt);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = (evt) => {
    evt.preventDefault();

    const answer_2 = Verify(userID, password, usersData);
    if (answer_2) {
      console.log("user is valid");
      alert(`welcome ${userID}`);
    } else {
      console.log("userisinvalid");
    }

    setFormData({
      userID: "",
      password: "",
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={HandleSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          placeholder="UserID"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignIn;
