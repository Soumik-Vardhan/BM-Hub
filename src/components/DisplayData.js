import React from "react";

export default function DisplayData(props) {
  //prop1 = {propers} and prop2 = {my_list}
  const { prop1, prop2 } = props;
  console.log(prop1, prop2);
  // console.log(prop1);
  // console.log(prop2);
  //u can use the same display data for manager search too.
  return (
    <>
      <div className="card-component">
        <p>we r in display data</p>
        {prop2.map((pro, index) => {
          const anwer = prop1.find((anwer) => anwer.id == pro);
          // console.log(anwer);
          if (anwer) {
            return (
              <>
                <div className="card-content">
                  <p key={anwer.id}>Project name is {anwer.projectName} </p>
                  <p>
                    Manager is
                    {anwer.nameOfManager}
                  </p>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}
