import React, { useEffect } from "react";
import {
  ActionFunction,
  Form,
  Link,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { AuthService } from "../services/AuthService";
import { useActionData } from "react-router-dom";
import { errorMsg } from "./Register";
import { AuthContextType, useAuth } from "../store/authStore";
import Loader from "../components/Loading";

export const action =
  (authContext: AuthContextType): ActionFunction =>
  async ({ request }) => {
    const { setAuthInfo } = authContext;
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
      const res = await authService.login(
        username.toString(),
        password.toString()
      );
      const { token, userId } = res as { token: string; userId: string };
      setAuthInfo({ id: userId, token, userName: username.toString() });
      return {
        msg: "Login successful",
      };
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
  const { token } = useAuth() as AuthContextType;
  const nagivate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    if (token) {
      nagivate("/dashboard");
    }
  }, [token, nagivate]);
  const errors: errorMsg = useActionData() as errorMsg;

  if (isLoading) return <Loader />;
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
