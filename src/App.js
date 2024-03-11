import logo from "./logo.svg";
import "./App.css";
import SignUp from "./signup";
import SignIn from "./signin";
import UserStatus from "./verification";
import { OurContextProvider } from "./letsContext";
function App() {
  // console.log("inside APp");
  return (
    <OurContextProvider>
      <UserStatus />
    </OurContextProvider>
  );
}

export default App;
