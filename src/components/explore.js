import React from "react";
import ManagerContextObject from "../managerContext";
import { OurAnswer } from "../managerContext";
import { useState, useEffect } from "react";
import DisplayData from "./DisplayData";
import RandomCard from "./RandomCard";

function Explore() {
  const [my_list, setMy_List] = useState([]);
  let { isManager } = OurAnswer();
  const { userIdContext } = OurAnswer();
  const [searching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchText, setSearchText] = useState();
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
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
  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchData(value);
  };

  useEffect(() => {
    if (searching) {
      const newList = [];
      projectDetails.forEach((pro) => {
        if (
          Object.values(pro).some((value) => {
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
    }
  }, [searching, searchData, projectDetails]);
  // const my_list = [];
  const handleClickSearch = () => {
    setSearching(true);

    // projectDetails.forEach((pro) => {
    //   if (
    //     Object.values(pro).some((value) => {
    //       if (Array.isArray(value)) {
    //         return value.includes(searchData);
    //       } else {
    //         return value === searchData;
    //       }
    //     })
    //   ) {
    //     my_list.push(pro.id);
    //   }
    // });
    // console.log(my_list);
  };
  console.log(userIdContext);

  return (
    <>
      <h1>we r in explore</h1>
      <div>
        {searching ? (
          <DisplayData prop1={projectDetails} prop2={my_list} />
        ) : (
          <>
            <div className="search-bar">
              <h3>search here </h3>
              <input
                type="text"
                id="input-type"
                value={searchData}
                onChange={handleChange}
              />
              <button onClick={handleClickSearch}>Search</button>
            </div>
            <RandomCard />
          </>
        )}
      </div>
    </>
  );
  //here we need to types of data one is to display random data when the user yet to start the searching process and the other is the data with the details which user is searched
}

export default Explore;
