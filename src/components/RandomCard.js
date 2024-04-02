import React, { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import "../styles/ManagerDashBoard.css";

export default function RandomCard(props) {
  const { ourProp } = props;
  const ourLen = ourProp.length - 1;
  const ourMax = ourLen + 1;
  const ourMin = 1;
  console.log(ourMin, ourMax, ourLen);

  function randomCandi(ourMin, ourMax, ourLen, ourProp) {
    console.log("inside randomCandi");
    const ans_arr = [];
    const ans_arr_obj = []; //this stores the objects after making them unique
    function randomGen(ourMin, ourMax) {
      const minc = Math.ceil(ourMin);
      const maxc = Math.floor(ourMax);
      console.log("inside randomGen");
      return Math.floor(Math.random() * (maxc - minc) + minc);
    }
    for (var i = 0; i < ourLen; i++) {
      var ans;
      do {
        ans = randomGen(ourMin, ourMax);
      } while (ans_arr.includes(ans));
      {
        ans_arr.push(ans);
      }
    }
    ans_arr.forEach((each) => {
      ans_arr_obj.push(ourProp[each]);
    });
    return ans_arr_obj;
  }

  const handleUpVote = () => {
    console.log("you clicked upvote");
  };
  const ans = randomCandi(ourMin, ourMax, ourLen, ourProp);
  console.log(ans);
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (projectId) => {
    console.log(projectId);
    setShow(true);
    setSelectedProject(
      props.ourProp.filter((project) => project.id === projectId)
    );
    console.log(selectedProject);
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-2 m-3">
        {props.ourProp.map((project) => (
          <Card
            style={{ width: "18rem" }}
            onClick={() => handleShow(project.id)}
            className="cursor-pointer"
          >
            {/* <Card.Img variant="" src={employeeImage} /> */}
            <Card.Body>
              <Card.Title>{project.projectName}</Card.Title>
              <span>{project.nameOfManager}</span>
              <span> {project.requiredStack.map((tech) => tech)}</span>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* //for modal on click on card */}
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

      {/* <div className="card-component">
        {ans.map((our, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2>Project: {our.projectName}</h2>
              <p>Manager: {our.nameOfManager}</p>
              <button onClick={handleUpVote}>Upvote</button> it is just demo we need this feature perfect on employee cards */}
      {/* <p>Required Skill:{our.requiredStack.join(", ")}</p>
            </div>
          </div>
          // <div className="card" key={index}>
          // <div className = "card-content">
        ))} */}
      {/* </div> */}
    </>

    // <div>
    //   <h3>Random Card</h3>
    //   {ans.map((our) => (
    //     <div>
    //       <h1 id={our.id}>
    //         project is {our.project} and manager is {our.name}
    //       </h1>
    //     </div>
    //   ))}
    // </div>
  );

  {
    /*
  <>
    <div className = "card-component">
    {data.map((dat,index)=>(
      <div className="card" key={index}>
      <div className = "card-content">
      <h2> {dat.name} </h2>
      <p>Experience: {dat.exp}  </p>
      <div className="Upvote">
            <button onClick={console.log("upvote clicked ")}>Remove</button>
      </div>
      <p>{dat.upvotes}</p>
      <p>Tech Stack: {dat.techStack.join(',')}</p>
      </div>
      
      </div>
    ))}
    
    
    </div>
    
    </> 
 */
  }

  // return (
  //   <div>
  //     <h3>Random Card</h3>
  //     {ans.map((our) => (
  //       <div key={our.id}>
  //         <h1>{our.project}here</h1>
  //       </div>
  //     ))}
  //   </div>
  // );
}
