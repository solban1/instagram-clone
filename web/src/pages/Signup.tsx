import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import SignupForm from "../components/signup-form/SignupForm";

const Signup = () => {
  const [cookies] = useCookies(["XSRF-TOKEN"]);
  const nav = useNavigate();

  useEffect(() => {
    if (cookies["XSRF-TOKEN"]) {
      nav("/", { replace: true });
    }
  });

  return (
    <div className="center">
      <SignupForm />
    </div>
  );
};

export default Signup;
