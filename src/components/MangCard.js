import React from "react";
import { OurAnswer } from "../managerContext";
import { useState, useEffect } from "react";
import managerUpdateStack from "./managerUpdateStack";

export default function MangCard() {
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

  // const index = projectDetails.findIndex((pro) => pro.id == userIdContext);
  // console.log(index);
  // console.log("we r in manager dashboard", proTechStack);

  // const mactchingEmps = [];
  // empDetails.forEach((emp) => {
  //   console.log(projectDetails[index].requiredTech);
  //   const isEligible = projectDetails[index].requiredTech.some((s) =>
  //     emp.techStack.includes(s)
  //   );
  //   if (isEligible) {
  //     mactchingEmps.push(emp.id);
  //   }
  // });

  // console.log(mactchingEmps);
  const matchingEmps = [];
  empDetails.forEach((emp) => {
    const isEligible = projectDetails.some((pro) => {
      if (pro.id === userIdContext) {
        return pro.requiredTech.some((e) => emp.techStack.includes(e));
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
    if (pro.id == userIdContext && pro.requiredTech.length == 0) {
      emptyFlag = true;
    }
  });

  // projectDetails.map((pro) => {
  //   if (pro.id === userIdContext) {
  //     console.log("it is working now");
  //   }
  // });
  return (
    <>
      {emptyFlag ? (
        <managerUpdateStack />
      ) : (
        <>
          we r in Manager card and here are some profiles for your project
          {matchingEmps.map((man) => {
            // Use `find()` instead of `map()` to find the matching employee
            const emp = empDetails.find((emp) => emp.id === man);
            // Check if the employee exists
            if (emp) {
              return <li key={emp.id}>Employee is {emp.name}</li>;
            } else {
              return null; // Return null if no employee found
            }
          })}
        </>
      )}
    </>
  );
}
