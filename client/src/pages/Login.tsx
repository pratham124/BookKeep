import React from "react";
import { Form } from "react-router-dom";

const Login = () => {
  return (
    <div className="form-div">
      <Form method="post" className="form">
        <h1>Login</h1>
        <div className="form-row">
          <label htmlFor={"email"} className="form-label">
            Email
          </label>
          <input type="email" name="email" className="form-input" />
        </div>
      </Form>
    </div>
  );
};

export default Login;
