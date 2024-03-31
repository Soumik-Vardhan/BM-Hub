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
  const [userCreds, setUserCreds] = useState([]);
  const [usersTaggedData, setUsersTaggedData] = useState([]);
  const { isManager, setIsManager, userIdContext, setUserIdContext } =
    OurAnswer();

  // let { isManager, setIsManager } = OurAnswer(); //false
  // let { userIdContext, setUserIdContext } = OurAnswer(); //empty
  const [signInFlag, setSignInFlag] = useState(false);
  const [retest, setReTest] = useState(true);
  console.log("before clicking", isManager);
  useEffect(() => {
    fetch("http://localhost:3000/getCred")
      .then((response) => response.json())
      .then((data) => {
        setUserCreds(data);
        console.log(data);
      });
  }, []);

  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });
  // const userAuth = useContext(contextObject);
  let isUserAManager = useContext(ManagerContextObject); //here intial value which is false will be loaded from ManagerContext
  // const handleChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const HandleSubmit = (evt) => {
    evt.preventDefault();

    const answer_2 = Verify(formData.userID, formData.password, userCreds);
    if (answer_2) {
      setSignInFlag(true);

      console.log("user is valid");
      alert(`welcome ${formData.userID}`);
    } else {
      console.log("userisinvalid");
    }
    let isUserAManager = false;

    // const userm = userCreds.find((user) => user.id === formData.userID);
    userCreds.map((user) => {
      console.log(
        "user.id is ",
        user.id,
        "formDataId is",
        formData.userID,
        "and his respective usertag",
        user.tag,
        "default is manger?",
        isManager
      );
    });
    userCreds.forEach((user) => {
      if (user.id === formData.userID) {
        console.log(
          "inside first loop and original value",
          userIdContext,
          user.tag
        );
        setUserIdContext(formData.userID);
        console.log("after update", userIdContext);
        if (user.tag) {
          console.log("printing usertag", user.tag);
          console.log("inside second loop defaul ismanger", isManager);
          setIsManager(true);
          console.log("afrer update", isManager);
        } else {
          setIsManager(false);
        }
      }
    });

    console.log(userIdContext);
    let dummy = true;
    if (dummy) {
      console.log("dummy true");
    }

    console.log("userId context", userIdContext);
    console.log("is mager in signin", isManager);

    setFormData({
      userID: "",
      password: "",
    });
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
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
            {/* {signInFlag && retest && <ManagerDashBoard />} */}
          </form>
        </div>
      )}
    </div>
  );
}

export default SignIn;
