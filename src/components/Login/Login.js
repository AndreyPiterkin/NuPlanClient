import React, { useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  })
  .then(data => {
    if (data.status === 200) {
      return Cookies.get('uid');
    } else {
      return { message: 'Invalid credentials' };
    }
  })
 }

export default function Login({ setToken }) {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  
  const handleValidation = (event) => {
    let formIsValid = true;
  
    if (!username.match(/^[A-Za-z]+$/)) { 
      formIsValid = false;
      setusernameError("Username Not Valid");
      return false;
    } else {
      setusernameError("");
      formIsValid = true;
    }
  
    if (!password.match(/^[0-9a-zA-Z]+$/)) {
      formIsValid = false;
      setpasswordError(
        "Must only contain alphanumeric characters"
      );
    } else if (!password.match(/.{3,22}/)) {
      formIsValid = false;
      setpasswordError(
        "Length must be 3-22"
      );
    }  else {
      setpasswordError("");
      formIsValid = true;
    }
    return formIsValid;
  };
  
  const loginSubmit = async (e) => {
    e.preventDefault();
    setpasswordError("");
    setusernameError("");
    if (handleValidation()) {
      const token = await loginUser({
        username,
        password
      });
      if (!token.message) {
        setToken(token);
        navigate('/dashboard');
      } else {
        setpasswordError(token.message);
      }
    }    
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
      <div className="col-md-4">
        <form id="loginform" onSubmit={loginSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="UsernameInput"
              name="UsernameInput"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <small id="usernameHelp" className="text-danger form-text">
              {usernameError}
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <small id="passworderror" className="text-danger form-text">
              {passwordError}
            </small>
          </div>
          <div style={{
            height: "10px"
          }}></div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div style={{
            height: "25px"
          }}></div>
          <NavLink to="/signup">
            <p>Don't have an account? Signup here</p>
          </NavLink>
        </form>
      </div>
    </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}


