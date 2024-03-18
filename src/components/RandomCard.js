import React from "react";

export default function RandomCard(props) {
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
  const ans = randomCandi(ourMin, ourMax, ourLen, ourProp);
  console.log(ans);
  return (
    <div>
      <h3>Random Card</h3>
      {ans.map((our) => (
        <div>
          <h1 id={our.id}>
            project is {our.project} and manager is {our.name}
          </h1>
        </div>
      ))}
    </div>
  );

  // return (
  //   <div>
  //     <h3>Random Card</h3>
  //     {ans.map((our) => (
  //       <div key={our.id}>
  //         <h1>{our.project}here</h1>
  //       </div>
  //     ))}
  //   </div>
  // );
}
