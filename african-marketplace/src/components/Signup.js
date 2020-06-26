import React, { setState } from "react";
import axiosWithAuth from "../utilites/axiosWithAuth";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignupForm = ({ values, errors, touched, isSubmitting, history }) => {
  console.log(history);

  return (
    <div className="SignupBlock">
      <Form>
        <div className="SignupPart">
          <label>Username</label>
        </div>
        <div className="SignupPart">
          <Field type="text" name="username" />
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
        </div>
        <div className="SignupPart">
          <label>Password</label>
        </div>
        <div className="SignupPart">
          <Field type="password" name="password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <div className="SignupPart">
          <label>First Name</label>
        </div>
        <div className="SignupPart">
          <Field type="text" name="first_name" />
          {touched.first_name && errors.first_name && (
            <p className="error">{errors.first_name}</p>
          )}
        </div>
        <div className="SignupPart">
          <label>Last Name</label>
        </div>
        <div className="SignupPart">
          <Field type="text" name="last_name" />
          {touched.last_name && errors.last_name && (
            <p className="error">{errors.last_name}</p>
          )}
        </div>
        <div className="SignupPart">
          <label>Email</label>
        </div>
        <div className="SignupPart">
          <Field type="email" name="email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>
        <div className="SignupBtns">
          <Button primary type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
          <Button secondary>
            <Link to="/">Cancel</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Signup = withFormik({
  mapPropsToValues({ username, password, email, first_name, last_name }) {
    return {
      username: username || "",
      password: password || "",
      email: email || "",
      first_name: first_name || "",
      last_name: last_name || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least six characters")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string().required("Full name is required"),
    last_name: Yup.string().required("Full name is required"),
  }),

  handleSubmit(values, { props, setErrors }) {
    //event.preventDefault();
    if (!values.username) {
      setErrors({ username: "Username is required." });
    } else if (!values.password) {
      setErrors({ password: "Password is required" });
    } else if (values.password && values.password.length < 6) {
      setErrors({ password: "Password must be at least six characters" });
      //} else if (this.validationSchema.validateAt({ email:  })) {
      // setErrors({ email: "Please enter a valid email" });
    } else if (!values.first_name) {
      setErrors({ first_name: "First name is required" });
    } else if (!values.last_name) {
      setErrors({ last_name: "Last name is required" });
    } else {
      console.log("In else clause");

      axiosWithAuth()
        .post("/signup", values)
        .then((res) => {
          console.log("Successful signup", res);
          props.history.push("/");
        })
        .catch((err) => console.log("Oh-oh, something wrong", err));
    }
  },
})(SignupForm);

function SignupPageHeader(props) {
  return (
    <Container text>
      <Header as="h2">Welcome to the African Marketplace App!</Header>
      <Header as="h3">Complete this form to create a new account.</Header>
      <Signup {...props} />
    </Container>
  );
}

export default SignupPageHeader;
