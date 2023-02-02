import InstagramLogo from "../../assets/logo.png"
import { useForm, RegisterOptions } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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

  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' });
  const nav = useNavigate();

  const submit = (data: object) => {
    console.log(data);
    axios.post('http://localhost:8000/users/signup/', data)
      .then(response => {
        console.log(response);
        localStorage.setItem("userId", response.data.pk);
        nav('/', {replace: true});
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit(submit)}>
      <img className="form-logo" src={InstagramLogo} alt="Instaclone" />
      <input className="form-input" type="email" {...register("email", emailOpts)} placeholder="이메일" />
      <input className="form-input" type="text" minLength={2} {...register("username", usernameOpts)} placeholder="사용자이름" />
      <input className="form-input" type="password" minLength={4} {...register("password", passwordOpts)} placeholder="비밀번호" />
      <button className="form-btn form-btn-blue" type="submit">가입</button>
    </form>
  )
};

export default SignupForm;