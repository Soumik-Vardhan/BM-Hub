import React, { useEffect, useState } from "react";
import Verify from "./veryify";
import { useContext } from "react";
import ManagerContextObject from "../managerContext";
// import { ManagerProvider } from "../managerContext";
import { OurAnswer } from "../managerContext";
import { Link } from "react-router-dom";
import ManagerDashBoard from "./ManagerDashBoard";
import EmpDashBoard from "./EmpDashBoard";

function SignIn({ verify }) {
  const [usersData, setUsersData] = useState([]);
  const [usersTaggedData, setUsersTaggedData] = useState([]);

  const { isManager, setIsManager } = OurAnswer();
  const { userIdContext, setUserIdContext } = OurAnswer();
  const [signInFlag, setSignInFlag] = useState(false);
  // const [retest, setReTest] = useState(true);
  useEffect(() => {
    // Fetching the data weter user is manager or employee user data from the server
    fetch("http://localhost:3000/e_tag")
      .then((response) => response.json())
      .then((data) => {
        setUsersTaggedData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  // console.log("I am users taged data ", usersTaggedData);

  useEffect(() => {
    // Fetch user data which is password or username of the user from the server
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
  // const userAuth = useContext(contextObject);
  let isUserAManager = useContext(ManagerContextObject); //here intial value which is false will be loaded from ManagerContext
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
      setSignInFlag(true);

      console.log("user is valid");
      alert(`welcome ${formData.userID}`);
    } else {
      console.log("userisinvalid");
    }
    let isUserAManager = false;

    const user = usersTaggedData.find((user) => user.id === formData.userID);
    // const isManager = user ? user.tag : "sorry ID not found";
    if (user) {
      setUserIdContext(formData.userID);
      if (user.tag == "manager") {
        setIsManager(true);
      }
    }

    console.log("is userisManager", isManager);

    setFormData({
      userID: "",
      password: "",
    });
  };

  return (
    <div>
      {signInFlag ? (
        isManager ? (
          <ManagerDashBoard />
        ) : (
          <EmpDashBoard />
        )
      ) : (
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
            <Link to="/explore">explore</Link>
            {/* {signInFlag && retest && <ManagerDashBoard />} */}
          </form>
        </div>
      )}
    </div>
  );
}

export default SignIn;
