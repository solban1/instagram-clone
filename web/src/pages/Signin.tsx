import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

import SigninForm from "../components/signin-form/SigninForm";

const Signin = () => {
  const [cookies] = useCookies(["XSRF-TOKEN"]);
  const nav = useNavigate();
  useEffect(() => {
    if (cookies["XSRF-TOKEN"]) {
      nav("/", { replace: true });
    }
  });

  return (
    <div className="center">
      <SigninForm />
      <div className="center-item">
        계정이 없으신가요?{" "}
        <Link className="signup-link noline-link" to="/signup">
          가입하기
        </Link>
      </div>
    </div>
  );
};

export default Signin;
