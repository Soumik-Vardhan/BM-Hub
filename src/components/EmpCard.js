import React, { useState, useEffect } from "react";
import { OurAnswer } from "../managerContext";
import EmpupdateStack from "./EmpupdateStack";

export default function EmpCard() {
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  let { userIdContext } = OurAnswer();
  useEffect(() => {
    // Fetching the data weter user is manager or employee user data from the server
    fetch("http://localhost:3000/e_details")
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
    fetch("http://localhost:3000/m_details")
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
  // empDetails.map((emp) => {
  //   if (emp.id == userIdContext) {
  //     // console.log(emp.techStack);
  //     console.log(emp.techStack.includes("Python"));
  //   }
  // });
  const matchingIds = projectDetails.reduce((acc, project) => {
    const hasMatchingTech = empDetails[index].techStack.some((tech) =>
      project.requiredTech.includes(tech)
    );
    if (hasMatchingTech) {
      acc.push(project.id);
    }
    return acc;
  }, []);
  console.log("matching Id's", matchingIds);
  let emptyFlag = false; //intially techStack is not empty
  empDetails.map((emp) => {
    if (emp.id == userIdContext && emp.techStack.length == 0) {
      emptyFlag = true; //here we r making it true if it is empty
    }
  });

  return (
    <>
      {emptyFlag ? (
        <EmpupdateStack />
      ) : (
        <>
          <div>we r in EmpCard and here are some projects for your career</div>
          {matchingIds.map((match) => {
            const work = projectDetails.find((work) => work.id == match);
            if (work) {
              return (
                <>
                  <div className="card-container">
                    <div className="card-id"> {work.id} </div>
                    <div className="card-name">{work.name}</div>
                  </div>
                </>
              );
            }
          })}
        </>
      )}
    </>
  );
}
