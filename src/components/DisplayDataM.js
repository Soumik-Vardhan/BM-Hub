import React from "react";

export default function DisplayDataM(props) {
  const { prop1, prop2 } = props;
  console.log(prop1, prop2);
  // console.log(prop1);
  // console.log(prop2);
  //u can use the same display data for manager search too.
  return (
    <>
      <div className="card-component">
        <p>we r in displaym data</p>
        {prop2.map((pro, index) => {
          const anwer = prop1.find((anwer) => anwer.id == pro);
          // console.log(anwer);
          if (anwer) {
            return (
              <>
                <div className="card-content">
                  <p key={anwer.id}>Name {anwer.name} </p>
                  <p>TechStack:{anwer.techStack}</p>
                  <p>Upvotes: {anwer.upVotes}</p>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}
