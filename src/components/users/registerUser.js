import React, { useRef } from "react";
import {
  Container,
  Button,
  Modal,
} from "react-bootstrap";
const axios = require("axios").default;

// USER SIGN UP

const UserRegister = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();


const addNewUser = async () => {
  try {
    const response = await axios.post("http://localhost:3001/users", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value
    });
    props.sendUserGetRequest();
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    window.location.replace("/");
    emailRef.current.value = "";
    passwordRef.current.value = "";
  } catch (error) {
    console.log(error);
  }
};
return (
  <Container>
    <Modal.Body>
      <form onSubmit={addNewUser}>
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
);

};

export default UserRegister;


