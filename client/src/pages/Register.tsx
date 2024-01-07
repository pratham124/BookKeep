import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { AuthService } from "../services/AuthService";

export type errorMsg = {
  username?: string;
  password?: string;
};

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
    await authService.signup(username.toString(), password.toString());
    return redirect("/login");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
    return error;
  }
};

const Register = () => {
  const errors: errorMsg = useActionData() as errorMsg;
  return (
    <div className="form-div ">
      <Form method="post" className="form">
        <h1>Register</h1>
        <FormRow
          defaultValue=""
          name="username"
          type="text"
          labelText="Username"
          placeHolder="JohnDoe"
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
