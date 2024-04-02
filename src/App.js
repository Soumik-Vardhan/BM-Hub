import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/Signup";
import { useRef } from "react";
import { Container } from "react-bootstrap";
import { ManagerProvider } from "./managerContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import EmpDashBoard from "./components/EmpDashBoard";
import ManagerDashBoard from "./components/ManagerDashBoard";
import Footer from "./components/Footer";
import ForgotPsd from "./components/ForgotPsd";
import Mexplore from "./components/Mexplore";
import Home from "./components/Home";
import About from "./components/About";
// import { userInfo } from "os";

function App() {
  return (
    <Container className="d-flex-column App" fluid>
      <ManagerProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/mexplore" element={<Mexplore />} />
            <Route path="/employeeDashboard" element={<EmpDashBoard />} />
            <Route path="/managerDashboard" element={<ManagerDashBoard />} />
            <Route path="/navBar" element={<NavBar />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/signUp" element={<SignUp />} />

            <Route path="/forgotPsd" element={<ForgotPsd />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </ManagerProvider>
    </Container>

    // // <OurContextProvider>
    // //   <UserStatus />
    // </OurContextProvider>
  );
}

export default App;
