import React from "react";

import OutHeader from "./OutHeader";
import Login from "./Login";

function LoginForm(props) {
  return (
    <>
      <OutHeader />
      <Login history={props.history} />
    </>
  );
}

export default LoginForm;
