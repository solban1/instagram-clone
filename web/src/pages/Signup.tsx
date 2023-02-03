import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import SignupForm from "../components/signup-form/SignupForm";

const Signup = () => {
  const [cookies] = useCookies();
  const nav = useNavigate();

  useEffect(() => {
    if (cookies.csrftoken) {
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
