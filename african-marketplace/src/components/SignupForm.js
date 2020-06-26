import React from "react";

import OutHeader from "./OutHeader";
import Signup from "./Signup";

function SignupForm(props) {
  return (
    <>
      <OutHeader />
      <Signup history={props.history} />
    </>
  );
}

export default SignupForm;
