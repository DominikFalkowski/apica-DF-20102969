import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const context = useContext(AuthContext);

  const register = () => {
    console.log("Register function triggered");
    let passwordRegEx = /^.{3,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      console.log("Passwords are valid and match");
      context.register(userName, password);
      setRegistered(true);
    } else {
      console.log("Password validation failed or passwords do not match");
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setPasswordAgain(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default SignUpPage;
