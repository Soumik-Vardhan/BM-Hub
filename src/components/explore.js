import React from "react";
import ManagerContextObject from "../managerContext";
import { OurAnswer } from "../managerContext";
import { useState, useEffect } from "react";
import DisplayData from "./DisplayData";
import RandomCard from "./RandomCard";
import RandomCardM from "./RandomCardM";
import "../styles/ManagerDashBoard.css";
import { Form, Card } from "react-bootstrap";

function Explore() {
  const [my_list, setMy_List] = useState([]);
  const { isManager } = OurAnswer();
  const { userIdContext } = OurAnswer();
  const [searching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchText, setSearchText] = useState();
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  console.log("in exlore", isManager);

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

  // useEffect(() => {
  //   // Fetching the data weter user is manager or employee user data from the server
  //   fetch("http://localhost:3000/e_details")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setEmpDetails(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Fetching the data weter user is manager or employee user data from the server
  //   fetch("http://localhost:3000/m_details")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setprojectDetails(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

  // Bhavana's search logic
  const [searchTerm, setSearchTerm] = useState("");
  // Bhavana's search logic

  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchData(value);
    // Bhavana's search logic
    setSearchTerm(evt.target.value);
    // Bhavana's search logic
  };
  // Bhavana's search logic
  const filteredData = projectDetails.filter((project) => {
    return project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    //  ||
    // project.requiredStack.toLowerCase().includes(searchTerm.toLowerCase())
  });
  console.log(filteredData);
  // Bhavana's search logic

  useEffect(() => {
    if (searching) {
      const newList = [];
      projectDetails.forEach((pro) => {
        console.log("each Pro is", pro);
        if (
          Object.values(pro).some((value) => {
            console.log(Object.values(pro));
            if (Array.isArray(value)) {
              return value.includes(searchData);
            } else {
              return value === searchData;
            }
          })
        ) {
          newList.push(pro.id);
        }
      });
      setMy_List(newList);
      // console.log("inside useeffect", my_list);
    }
  }, [searching, searchData, projectDetails]);
  // const my_list = [];
  console.log("outside", my_list);
  const handleClickSearch = () => {
    setSearching(true);

    projectDetails.forEach((pro) => {
      console.log("for each pro", pro);
      if (
        Object.values(pro).some((value) => {
          if (Array.isArray(value)) {
            console.log(searchData);
            return value.includes(searchData);
          } else {
            return value === searchData;
          }
        })
      ) {
        my_list.push(pro.id);
      }
    });
    console.log(my_list);
  };
  console.log(userIdContext);

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex justify-content-center align-items-center flex-column mb-5">
          <h2>Explore More </h2>
          <Form.Control
            type="text"
            placeholder="seach here"
            value={searchData}
            onChange={handleChange}
            // className="w-50"
          />
          {/* <button onClick={handleClickSearch}>Search</button> */}
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 m-3">
          <RandomCard ourProp={filteredData} />
        </div>
      </div>

      {/* {searching ? (
          <DisplayData prop1={projectDetails} prop2={my_list} />
        ) : (
          <>
            <div className="search-bar">
              <h3>search here </h3>
              <input
                type="text"
                id="input-type"
               
              />
              <button onClick={handleClickSearch}>Search</button>
            </div> */}
      {/* make the necessary changes here like if user is manager then random employees should be displayed, if the user is employee then random mangers should be dispalyed  */}
      {/* </>
        )}
          </div>*/}
    </>
  );
  {
    /* //here we need to types of data one is to display random data when the user yet to start the searching process and the other is the data with the details which user is searched */
  }
}

export default Explore;
