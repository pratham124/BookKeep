import React from "react";
import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { AuthService } from "../services/AuthService";
import { useActionData } from "react-router-dom";
import { errorMsg } from "./Register";

export const action: ActionFunction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const errors: errorMsg = {};
  if (!data.username) {
    errors.username = "Username is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const { username, password } = data;

  try {
    const authService = new AuthService();
    await authService.login(username.toString(), password.toString());
    return redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
    return error;
  }
};

const Login = () => {
  const errors: errorMsg = useActionData() as errorMsg;
  return (
    <div className="form-div">
      <Form method="post" className="form">
        <h1>Login</h1>
        <FormRow
          defaultValue=""
          name="username"
          type="text"
          labelText="Username"
          placeHolder="johndoe"
          isError={!!errors?.username}
        />
        <FormRow
          defaultValue=""
          name="password"
          type="password"
          labelText="Password"
          placeHolder="********"
          isError={!!errors?.password}
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
