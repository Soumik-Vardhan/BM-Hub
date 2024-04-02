import React, { useState, useEffect } from "react";
import { OurAnswer } from "../managerContext";
import EmpupdateStack from "./EmpupdateStack";
import { Button, Card, Container, Modal } from "react-bootstrap";
import "../styles/ManagerDashBoard.css";
import { Link } from "react-router-dom";
import employeeImage from "../assets/woman2.png";

export default function EmpCard({ value }) {
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  let { userIdContext } = OurAnswer();
  console.log("n new prp employee", value);
  useEffect(() => {
    // Fetching the data weter user is manager or employee user data from the server
    fetch("http://localhost:3000/getEmps")
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
    fetch("http://localhost:3000/getManager")
      .then((response) => response.json())
      .then((data) => {
        setprojectDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const index = empDetails.findIndex((emp) => emp.id === userIdContext);
  console.log(index);
  empDetails.map((emp) => {
    if (emp.id == userIdContext) {
      // console.log(emp.techStack);
      console.log(emp.techStack.includes("Python"));
    }
  });
  // const matchingIds = projectDetails.reduce((acc, project) => {
  //   const hasMatchingTech = empDetails[index].techStack.some((tech) =>
  //     project.requiredStack.includes(tech)
  //   );
  //   if (hasMatchingTech) {
  //     acc.push(project.id);
  //   }
  //   return acc;
  // }, []);
  // console.log("matching Id's", matchingIds);
  let emptyFlag = false; //intially techStack is not empty
  empDetails.map((emp) => {
    if (emp.id == userIdContext && emp.techStack.length == 0) {
      emptyFlag = true; //here we r making it true if it is empty
    }
  });

  // for  modal
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (projectId) => {
    console.log(projectId);
    setShow(true);
    setSelectedProject(
      projectDetails.filter((project) => project.id === projectId)
    );
    console.log(selectedProject);
  };

  return (
    <>
      {emptyFlag ? (
        <EmpupdateStack />
      ) : (
        <>
          {/*
        <div className="card-component">
        {ans.map((our, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2>Project: {our.project}</h2>
              <p>Manager: {our.name}</p>
              <p>Required Skill:{our.requiredTech.join(", ")}</p>
            </div>
          </div>
          // <div className="card" key={index}>
          // <div className = "card-content">
        ))}
      </div> 
      */}
          {/* <div>we r in EmpCard and here are some projects for your career</div> */}
          <div className="vh-100 d-flex justify-content-center align-items-center flex-column employee-dashboard">
            <div className="d-flex justify-content-center align-items-center flex-column mb-5">
              <h2>Welcome employe </h2>
              <p>
                Check out the projects that are best match for your tech stack
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 m-3">
              {projectDetails.slice(0, 4).map((project) => (
                <Card
                  style={{ width: "18rem" }}
                  onClick={() => handleShow(project.id)}
                  className="cursor-pointer"
                >
                  <Card.Img variant="" src={employeeImage} />
                  <Card.Body>
                    <Card.Title>{project.projectName}</Card.Title>
                    <span> {project.requiredStack.map((tech) => tech)}</span>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className="mt-5">
              <Link to="/explore">Explore More..</Link>
            </div>
          </div>
          {selectedProject.map((selectedProject) => (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProject.projectName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{selectedProject.projectDescription}</Modal.Body>
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

          {/* */}

          {/* <div className="card-component">
            {matchingIds.map((match, index) => {
              console.log(match);
              const work = projectDetails.find((work) => work.id == match);
              if (work) {
                return (
                  <>
                    <div className="card" key={index}>
                      <div className="card-content">
                        <h2>Project: {work.projectName}</h2>
                        <p>Manager: {work.nameOfManager}</p>
                        <p>Required Tech: {work.requiredStack.join(", ")}</p>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div> */}

          {/* {matchingIds.map((match) => {
            const work = projectDetails.find((work) => work.id == match);
            if (work) {
              return (
                <>
                  <div className="card-container">
                    <h2>Project: {work.project} </h2>
                    <p>{work.name}</p>
                    <p>{work.requiredTech}</p>
                  </div>
                </>
              );
            }
          })} */}
        </>
      )}
    </>
  );
}
