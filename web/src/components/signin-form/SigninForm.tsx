import { useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../assets/logo.png";

const SigninForm = () => {
  const emailOpts: RegisterOptions = {
    required: true,
    pattern: /\S+@\S+\.\S+/,
  };
  const passwordOpts: RegisterOptions = {
    required: true,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const nav = useNavigate();

  const onSubmit = (data: object) => {
    console.log(data);
    axios
      .post("/users/signin/", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("userId", response.data.pk);
        nav("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(Object.values(err.response.data).join(" "));
      });
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <img className="form-logo" src={Logo} alt="Instaclone" />
      <input
        className="form-input"
        type="email"
        placeholder="이메일"
        {...register("email", emailOpts)}
        required
      />
      <input
        className="form-input"
        type="password"
        placeholder="비밀번호"
        {...register("password", passwordOpts)}
        required
      />
      <button className="form-btn form-btn-blue" type="submit">
        로그인
      </button>
      <Link className="password-link noline-link" to="/password">
        <span className="passwork-link-text">비밀번호를 잊으셨나요?</span>
      </Link>
      {errorMsg !== "" && <div className="form-error">{errorMsg}</div>}
    </form>
  );
};

export default SigninForm;
