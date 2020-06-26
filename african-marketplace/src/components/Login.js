import React from "react";
import axiosWithAuth from "../utilites/axiosWithAuth";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LoginForm = ({ values, errors, touched, isSubmitting, history }) => {
  return (
    <div className="LoginBlock">
      <Form>
        <div className="LoginPart">
          <label>Username</label>
        </div>
        <div className="LoginPart">
          <Field type="text" name="username" />
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
        </div>
        <div className="LoginPart">
          <label>Password</label>
        </div>
        <div className="LoginPart">
          <Field type="password" name="password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <div className="LoginBtns">
          <Button primary type="submit" disabled={isSubmitting}>
            Login
          </Button>
          <Button secondary>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Login = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),

  handleSubmit(values, { props, setErrors }) {
    //event.preventDefault();
    if (!values.username) {
      setErrors({ username: "Username is required." });
    } else if (!values.password) {
      setErrors({ password: "Password is required" });
    } else {
      console.log("In else clause");

      axiosWithAuth()
        .post("/login", values)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userID", res.data.id);
          props.history.push("/dashboard");
        })
        .catch((err) => console.log("Oh-oh, something wrong", err));
    }
  },
})(LoginForm);

function LoginPageHeader(props) {
  return (
    <Container text>
      <Header as="h2">Welcome to the African Marketplace App!</Header>
      <Header as="h3">Please Log In</Header>
      <Login {...props} />
    </Container>
  );
}

export default LoginPageHeader;
