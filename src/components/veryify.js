// authentication.js
export const Verify = (userID, password, usersData) => {
  let answer = null;
  console.log("third,inside verify");

  // console.log("oi", emp);
  // console.log(typeof usersData);
  // console.log(userID); //this is working
  console.log(typeof usersData);
  const ans_1 = usersData.find((emp) => {
    if (emp.id == userID) {
      if (emp.password == password) return true;
    } else {
      return false;
    }
  });
  if (ans_1) {
    return true;
  } else {
    return false;
  }
};
export default Verify;
