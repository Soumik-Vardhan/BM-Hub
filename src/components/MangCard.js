import React from "react";
import { OurAnswer } from "../managerContext";
import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

import { Button, Card, Container, Modal } from "react-bootstrap";
// import { log } from "console";
import "../styles/ManagerDashBoard.css";
import employeeImage from "../assets/woman2.png";
import { Link } from "react-router-dom";
export default function MangCard(props) {
  const { prop } = props;
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  let { userIdContext } = OurAnswer();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [upVotes, setUpVotes] = useState(0);
  const demoUSerID = userIdContext;
  console.log("demo", typeof demoUSerID);
  console.log(demoUSerID);
  console.log(props);
  // const { isLoading, data, apiError } = useFetch(
  //   "http://localhost:3000/getEmps"
  // );

  //button handling function
  const upvoteClick = (userId, userIdoContext) => {
    console.log("inside function", userIdoContext);
    console.log("demo in func", typeof demoUSerID);
    console.log({ hello: demoUSerID });
    if (isButtonClicked) {
      setIsButtonClicked(false);
      fetch(`http://localhost:3000/upVoteUndo/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerId: userIdContext }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Update state to reflect the updated upVotes value
          setUpVotes(data.upVotes);
        })
        .catch((error) => {
          console.error("Error updating upvotes:", error);
        });
    }
    // console.log("you cant dislike back");
    else {
      console.log("inside if is false");
      setIsButtonClicked(true);
      const payLoad = { managerID: userIdContext };
      console.log("payload", payLoad);
      console.log(userId);
      fetch(`http://localhost:3000/updateVote/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerId: userIdoContext }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Update state to reflect the updated upVotes value
          setUpVotes(data.upVotes);
        })
        .catch((error) => {
          console.error("Error updating upvotes:", error);
        });
    }
  };

  useEffect(() => {
    // Fetching the data weter user is manager or employee user data from the server
    fetch("http://localhost:3000/getEmps") // got the details of manager
      .then((response) => response.json())
      .then((data) => {
        setEmpDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetching the data weter user is manager or employee user data from the server
    fetch("http://localhost:3000/getManager") // got the details of manager
      .then((response) => response.json())
      .then((data) => {
        setprojectDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const matchingEmps = [];
  console.log(userIdContext);
  empDetails.forEach((emp) => {
    // console.log(emp);
    const isEligible = projectDetails.some((pro) => {
      // console.log(pro);
      if (pro.id === userIdContext) {
        console.log("verified");
        return pro.requiredStack.some((e) => emp.techStack.includes(e));
      }
      return false; // Return false if the pro.id does not match userIdContext
    });
    if (isEligible) {
      matchingEmps.push(emp.id);
    }
  });
  console.log(matchingEmps);

  let emptyFlag = false;
  projectDetails.map((pro) => {
    if (pro.id == userIdContext && pro.requiredStack.length == 0) {
      emptyFlag = true;
    }
  });

  // for  modal
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (empId) => {
    console.log(empId);
    setShow(true);
    setSelectedEmployee(empDetails.filter((employee) => employee.id === empId));
    console.log(selectedEmployee);
  };
  return (
    <>
      {emptyFlag ? (
        <managerUpdateStack />
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
            <div className="d-flex justify-content-center align-items-center flex-column mb-5">
              <h2>Welcome Managername, </h2>
              <p>
                Check out the employee profiles that is best match for your
                requirement
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 m-3">
              {empDetails.slice(0, 4).map((employee) => (
                <Card
                  style={{ width: "18rem" }}
                  onClick={() => handleShow(employee.id)}
                  className="cursor-pointer"
                >
                  <Card.Img
                    variant=""
                    src={employee.gender === "Female" ? employeeImage : null}
                  />
                  <Card.Body>
                    <Card.Title>{employee.name}</Card.Title>
                    <span> {employee.techStack.map((tech) => tech)}</span>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className="mt-5">
              <Link to="/mexplore">Explore More..</Link>
            </div>
          </div>
          {selectedEmployee.map((selectedEmployee) => (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedEmployee.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{selectedEmployee.jobDescription}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
          {/* {matchingEmps.map((man, index) => {
            // Use `find()` instead of `map()` to find the matching employee
            const emp = empDetails.find((emp) => emp.id === man);
            // Check if the employee exists
            if (emp) {
              return (
                <>
                  <li key={emp.id}>Employee is {emp.name}</li>
                  <div className="card" key={index}>
                    <h3>current upvotes: {emp.upVotes}</h3>

                    <div className="card-content">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => upvoteClick(emp._id, userIdContext)}
                      >
                        Upvote
                      </button>
                      <p>Name: {emp.name}</p>
                      <p>{emp._id}</p>
                      <p>TechStack: {emp.techStack.join(",")}</p>
                      <p>Currently:{emp.currentlyTagged}</p>
                    </div>
                  </div>
                </>
              );
            } else {
              return null; // Return null if no employee found
            }
          })} */}
        </>
      )}
    </>
  );
}
