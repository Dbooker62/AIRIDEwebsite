import React from "react";
import "./Register.scss";
import SignUp from "./SignUp";
// import Role from "./Role";
// import CheckEmail from "./CheckEmail";
// import SetPassword from "./SetPassword";
const Register = () => {
  return (
    <>
      <div className="registerComponent">
        <div className="percentBar"></div>
        <div className="allComponents">
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default Register;
