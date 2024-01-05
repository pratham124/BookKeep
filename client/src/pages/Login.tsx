import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import FormRow from "../components/FormRow";

export const action = ({ request }) => {
  return redirect("/dashboard");
};

const Login = () => {
  return (
    <div className="form-div">
      <Form method="post" className="form">
        <h1>Login</h1>
        <FormRow
          defaultValue=""
          name="email"
          type="email"
          labelText="Email"
          placeHolder="john@example.com"
        />
        <FormRow
          defaultValue=""
          name="password"
          type="password"
          labelText="Password"
          placeHolder="********"
        />
        <button className="btn btn-secondary btn-margin-top" type="submit">
          Login
        </button>
        <p className="link-text">
          Don't have an account?{" "}
          <Link to="/register" className="link-btn">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
