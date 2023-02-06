import { useState } from "react";
import Logo from "../../assets/logo.png";
import { useForm, RegisterOptions } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const emailOpts: RegisterOptions = {
    required: true,
    pattern: /\S+@\S+\.\S+/,
  };
  const usernameOpts: RegisterOptions = {
    required: true,
    minLength: 2,
  };
  const passwordOpts: RegisterOptions = {
    required: true,
    minLength: 4,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const nav = useNavigate();

  const onSubmit = (data: object) => {
    console.log(data);
    axios
      .post("/users/signup/", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("userId", response.data.pk);
        nav("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        // let errorArray: string[] = [];
        // Object.keys(err.response.data).map(key => {
        //   errorArray = [...errorArray.concat(err.response.data[key])];
        //   return null;
        // })
        setErrorMsg(Object.values(err.response.data).join(" "));
      });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <img className="form-logo" src={Logo} alt="Instaclone" />
      <input
        className="form-input"
        type="email"
        {...register("email", emailOpts)}
        placeholder="이메일"
        required
      />
      <input
        className="form-input"
        type="text"
        minLength={2}
        {...register("username", usernameOpts)}
        placeholder="사용자이름"
        required
      />
      <input
        className="form-input"
        type="password"
        minLength={4}
        {...register("password", passwordOpts)}
        placeholder="비밀번호"
        required
      />
      <button className="form-btn form-btn-blue" type="submit">
        가입
      </button>
      {errorMsg !== "" && <div className="form-error">{errorMsg}</div>}
    </form>
  );
};

export default SignupForm;
