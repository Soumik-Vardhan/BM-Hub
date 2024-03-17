import React from "react";

export default function DisplayData(props) {
  //prop1 = {propers} and prop2 = {my_list}
  const { prop1, prop2 } = props;
  // console.log(prop1);
  // console.log(prop2);
  //u can use the same display data for manager search too.
  return (
    <>
      <div>
        {prop2.map((pro) => {
          const anwer = prop1.find((anwer) => anwer.id == pro);
          // console.log(anwer);
          if (anwer) {
            return (
              <h3 key={anwer.id}>
                Project name is {anwer.project} and Manager is {anwer.name}
              </h3>
            );
          }
        })}
      </div>
      ;
    </>
  );
}
