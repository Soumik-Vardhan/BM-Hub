import React from "react";
import { OurAnswer } from "../managerContext";
import { useState, useEffect } from "react";

export default function MangCard() {
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  let { userIdContext } = OurAnswer();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [upVotes, setUpVotes] = useState(0);
  const demoUSerID = userIdContext;
  console.log("demo", typeof demoUSerID);

  useEffect(() => {
    fetch("http://localhost:3000/getEmps") //employee details
      .then((response) => response.json())
      .then((data) => {
        setEmpDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [upVotes]);

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
    fetch("http://localhost:3000/getEmps") //employee details
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
  empDetails.forEach((emp) => {
    const isEligible = projectDetails.some((pro) => {
      if (pro.id === userIdContext) {
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

  return (
    <>
      {emptyFlag ? (
        <managerUpdateStack />
      ) : (
        <>
          we r in Manager card and here are some profiles for your project
          {matchingEmps.map((man, index) => {
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
          })}
        </>
      )}
    </>
  );
}
