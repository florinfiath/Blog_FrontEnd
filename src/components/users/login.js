import { React, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [signUp, setsignUp] = useState(false);
  const handleCloseSignUp = () => setsignUp(false);
  const handlesignUp = () => setsignUp(true);
  const [signIn, setsignIn] = useState(false);
  const handleCloseSignIn = () => setsignIn(false);
  const handlesignIn = () => setsignIn(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  // USER SIGN IN 
  const loginUser = async () => {
    console.log(emailRef.current.value);
    try {
      axios
        .post("http://localhost:3001/users/login", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((resp) => {
          console.log(resp.data);
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          window.location.replace("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Container>
      <li class="nav-item nav-link">
        <DropdownButton
          id="dropdown-basic-button"
          title="Register here"
          variant="primary"
        >
          <Dropdown.Item className="dropdownButton" onClick={handlesignUp}>
            Sign Up
          </Dropdown.Item>
          <Dropdown.Item className="dropdownButton" onClick={handlesignIn}>
            Sign In
          </Dropdown.Item>
        </DropdownButton>
      </li>
      <Modal
        show={signUp}
        onHide={handleCloseSignUp}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">Sign up</Modal.Title>
        </Modal.Header>
        <Container>
          <Modal.Body>
            <form onSubmit={signUp}>
              <label for="email" className="labelClass">
                Email:
              </label>
              <input
                className="inputClass"
                id="email"
                name="email"
                placeholder="enter your email"
              />
              <label for="password" className="labelClass">
                Password:
              </label>
              <input
                className="inputClass"
                id="password"
                name="password"
                placeholder="enter your password"
              />
              <label className="labelClass">Confirm Password:</label>
              <input
                name="confirmPassword"
                className="inputClass"
                placeholder="confirm password"
              />
              <Button className="mt-5 modalButton" type="submit">
                Sign up
              </Button>
            </form>
          </Modal.Body>
        </Container>

        <Modal.Footer>
          <p className="modalP">Already have an account?</p>
          <Button
            className="modalButton"
            variant="primary"
            onClick={handlesignIn}
          >
            Sign in here
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={signIn}
        onHide={handleCloseSignIn}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle mb-4">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <form onSubmit={loginUser}>
            <label for="email" className="labelClass">
              Email:
            </label>
            <input
              className="inputClass"
              id="email"
              name="email"
              placeholder="enter your email"
            />
            <label for="password" className="labelClass">
              Password:
            </label>
            <input
              className="inputClass"
              id="password"
              name="password"
              placeholder="enter your password"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="modalButtonSignIn"
            style={{ marginRight: "auto" }}
          >
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
