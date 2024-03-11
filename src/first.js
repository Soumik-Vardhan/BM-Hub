import React from "react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
function ChoosePage() {
  const handleManagerClick = () => {
    console.log("Manager button clicked");
    // Add logic to navigate to the manager page or perform other actions
  };

  const handleEmployeeClick = () => {
    console.log("Employee button clicked");
    // Add logic to navigate to the employee page or perform other actions
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <div>
        <button onClick={handleManagerClick}>Manager</button>
        <button onClick={handleEmployeeClick}>Employee</button>
      </div>
    </div>
  );
}

export default ChoosePage;
