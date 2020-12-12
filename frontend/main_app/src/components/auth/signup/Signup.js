import React, { useEffect } from "react";

import RegisterUI from "../../layouts/formUI/RegisterUI";
import useForm from "./useForm";

const Signup = () => {
  useEffect(() => {}, []);

  return <RegisterUI formHook={useForm()} />;
};

export default Signup;
