import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import FormRow from "../components/FormRow";

export const action = ({ request }) => {
  return redirect("/login");
};

const Register = () => {
  return (
    <div className="form-div ">
      <Form method="post" className="form register-form">
        <h1>Register</h1>
        <FormRow
          defaultValue=""
          name="name"
          type="text"
          labelText="Name"
          placeHolder="John Doe"
        />
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
          Register
        </button>
        <p className="link-text">
          Have an account?{" "}
          <Link to="/login" className="link-btn">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
