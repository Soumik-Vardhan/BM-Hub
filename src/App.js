import "./App.css";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import { ManagerProvider } from "./managerContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import EmpDashBoard from "./components/EmpDashBoard";
import ManagerDashBoard from "./components/ManagerDashBoard";
import Footer from "./components/Footer";
import ForgotPsd from "./components/ForgotPsd";
import Mexplore from "./components/Mexplore";
function App() {
  return (
    <ManagerProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route path="signIn" element={<SignIn />} /> */}
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="explore" element={<Explore />} />
          <Route path="mexplore" element={<Mexplore/>}/>
          <Route path="employeeDashboard" element={<EmpDashBoard />} />
          <Route path="/managerDashboard" element={<ManagerDashBoard />} />
          <Route path="navBar" element={<Navbar />} />
          <Route path="footer" element={<Footer />} />
          <Route path="signUp" element={<SignUp />} />

          <Route path="forgotPsd" element={<ForgotPsd />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ManagerProvider>

    // // <OurContextProvider>
    // //   <UserStatus />
    // </OurContextProvider>
  );
}

export default App;
