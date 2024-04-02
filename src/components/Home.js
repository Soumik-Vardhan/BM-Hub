import React, { useState } from "react";
import SignIn from "./Signin";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { OurAnswer } from "../managerContext";
import { useEffect, useContext } from "react";
import ManagerContextObject from "../managerContext";
import ContactUs from "./ContactUs";
import About from "./About";
import Verify from "./veryify";
import signin_image from "../assets/signin_image.svg";
import home_background from "../assets/home_background.svg";
import "../styles/Home.css";
import { useFetch } from "./useFetch";
const Home = (props) => {
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const [usersTaggedData, setUsersTaggedData] = useState([]);
  const { isManager, setIsManager, userIdContext, setUserIdContext } =
    OurAnswer();

  // let { isManager, setIsManager } = OurAnswer(); //false
  // let { userIdContext, setUserIdContext } = OurAnswer(); //empty
  const [signInFlag, setSignInFlag] = useState(false);
  const { isLoading, data, apiError } = useFetch(
    "http://localhost:3000/getCred"
  );

  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // setError(Validation(formData));
    checkUser(formData.employeeId, formData.password);
    handleClose();
    setFormData({
      employeeId: "",
      password: "",
    });
  };
  // console.log(data);

  const navigate = useNavigate();
  const checkUser = (employeeId, password) => {
    data.forEach((employee) => {
      // console.log("foreach", employee.id);
      if (employee.id === employeeId && employee.password === password) {
        setUserIdContext(employee.id);
        console.log("user is valid");
        if (employee.tag) {
          setIsManager(true);
          navigate("/managerDashboard");
          console.log("user is manager", isManager);
        } else if (!employee.tag) {
          setIsManager(false);
          navigate("/employeeDashboard");

          console.log("user is an employee", isManager);
        }
      }
    });
    // data.map((emp) => console.log(emp.id));
  };

  const Validation = (formData) => {
    const errors = {};
    if (!formData.employeeId) {
      errors.id = "user Id is required!";
    } else {
      errors.password = "";
    }
    if (!formData.password) {
      errors.password = "password is required";
    }
    return errors;
  };

  return (
    <>
      <Container
        id="homeSection"
        className="w-100 d-flex align-items-center justify-content-even mt-0 pt-0"
      >
        <Row className="justify-content-md-center align-items-md-center">
          <Col md={4} id="home-left-container">
            <Row className="justify-content-md-start">Welcome to,</Row>
            <Row className="justify-content-md-start h1 job-wizard">
              Job Wizard
            </Row>
            <Row className="h6">
              Lorem Ipsum is simply dummy cimen book. It has survived not only
              five centuries, but al
            </Row>
            <Row className="justify-content-md-start mt-4">
              <Col md={4} className="justify-content-md-start">
                <Button className="p-3" onClick={handleShow}>
                  Sign In
                </Button>
              </Col>
              <Col md={5}>
                <Button as={Link} to="/sign" className="p-3">
                  New here ?
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <img src={signin_image} id="signin_image" />
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Employee Id</Form.Label>
                <Form.Control
                  // type="email"
                  placeholder="Enter employee Id"
                  autoFocus
                  onChange={handleChange}
                  name="employeeId"
                />
                {<p>{error.usermail}</p>}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Enter Password"
                  type="password"
                  onChange={handleChange}
                  name="password"
                />
                {error.password ? <p>{error.password}</p> : null}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Forgot Password
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <About ref={about} />
      <ContactUs ref={contact} /> */}
      </Container>
    </>
  );
};
export default Home;
