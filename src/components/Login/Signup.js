import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

async function signup(credentials) {
  return fetch('http://localhost:8080/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  })
  .then(data => {
    if (data.status === 200) {
      return data.status;
    } else {
      return { message: 'Invalid credentials' };
    }
  })
 }

export default function Signup() {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [fnameError, setfnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  
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
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    if (!fname.match(/^[A-Za-z]+$/)) {
      formIsValid = false;
      setfnameError(
        "Must only contain alphanumeric characters"
      );
      return false;
    } else {
      setfnameError("");
      formIsValid = true;
    }

    if (!lname.match(/^[A-Za-z]+$/)) {
      formIsValid = false;
      setlnameError(
        "Must only contain alphanumeric characters"
      );
      return false;
    } else {
      setlnameError("");
      formIsValid = true;
    }

    return formIsValid;
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setpasswordError("");
    setusernameError("");
    setfnameError("");
    setlnameError("");
    if (handleValidation()) {
      const token = await signup({
        username,
        password,
        fname,
        lname
      });
      if (!token.message) {
        navigate('/');
      } else {
        setlnameError(token.message);
      }
    }    
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
      <div className="col-md-4">
        <form id="loginform" onSubmit={handleSignup}>
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
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              id="FnameInput"
              name="FnameInput"
              aria-describedby="fnameHelp"
              placeholder="Enter first name"
              onChange={(event) => setFname(event.target.value)}
            />
            <small id="fnameHelp" className="text-danger form-text">
              {fnameError}
            </small>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              id="LnameInput"
              name="LnameInput"
              aria-describedby="lnameHelp"
              placeholder="Enter last name"
              onChange={(event) => setLname(event.target.value)}
            />
            <small id="usernameHelp" className="text-danger form-text">
              {lnameError}
            </small>
          </div>
          <div style={{
            height: "10px"
          }}></div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}


