import React from "react";

export default function RandomCardM(props) {
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
  return (
    <>
      <div>RandomCardM this is a random card of manager </div>

      <div className="card-component">
        {ans.map((our, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2>Name: {our.name}</h2>
              <p>Upvotes: {our.upVotes}</p>
              <p>TechStack:{our.techStack.join(", ")}</p>
              {/* <button onClick={handleUpVote}>Upvote</button> it is just demo we need this feature perfect on employee cards */}
              {/* <p>Required Skill:{our.requiredStack.join(", ")}</p> */}
            </div>
          </div>
          // <div className="card" key={index}>
          // <div className = "card-content">
        ))}
      </div>
    </>
  );
}
