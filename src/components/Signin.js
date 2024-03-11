import React, { useEffect, useState } from "react";
import Verify from "./veryify";
import { useContext } from "react";
import contextObject from "../letsContext";
import { Link } from "react-router-dom";

function SignIn({ verify }) {
  const [usersData, setUsersData] = useState([]);

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

  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });
  const userAuth = useContext(contextObject);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = (evt) => {
    evt.preventDefault();

    const answer_2 = Verify(formData.userID, formData.password, usersData);
    if (answer_2) {
      console.log("user is valid");
      alert(`welcome ${formData.userID}`);
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
        <Link to="/managerDashboard" onClick={HandleSubmit}>
          Sign In
        </Link>
        <Link to="/forgotPsd">Forgot Password</Link>
        <Link to="/SignUp">Sign Up</Link>
      </form>
    </div>
  );
}

export default SignIn;
