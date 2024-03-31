import React from "react";
import RandomCardM from "./RandomCardM";
import { OurAnswer } from "../managerContext";
import { useState, useEffect } from "react";
import DisplayDataM from "./DisplayDataM";

export default function Mexplore() {
  const [my_list, setMy_List] = useState([]);
  const { isManager } = OurAnswer();
  const { userIdContext } = OurAnswer();
  const [searching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchText, setSearchText] = useState();
  const [projectDetails, setprojectDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  console.log("in Mexlore", isManager);
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

  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchData(value);
  };

  useEffect(() => {
    if (searching) {
      const newList = [];
      empDetails.forEach((pro) => {
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

    empDetails.forEach((pro) => {
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
      <h1>we r in Mexplore</h1>
      <div>
        {searching ? (
          <DisplayDataM prop1={empDetails} prop2={my_list} />
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
            {/* Render RandomCardM only if user is a manager */}
            {isManager && <RandomCardM ourProp={empDetails} />}
          </>
        )}
      </div>
    </>
    // <div> we r in Mexplore</div>
  );
}

//////////////////////////jhi
