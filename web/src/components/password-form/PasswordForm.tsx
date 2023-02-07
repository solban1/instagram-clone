import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, RegisterOptions } from "react-hook-form";
import axios from "axios";

import LockIcon from "../../assets/lock.svg";

const PasswordForm = () => {
  const [current, setCurrent] = useState("email");
  const [btnLabel, setBtnLabel] = useState("인증코드 전송");
  const [time, setTime] = useState(299);
  const [timeStr, setTimeStr] = useState("4:59");
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({ mode: "onChange" });
  const nav = useNavigate();

  const emailOpts: RegisterOptions = {
    required: true,
    pattern: /\S+@\S+\.\S+/,
  };
  const authcodeOpts: RegisterOptions = {
    required: true,
    pattern: /^\w{6}$/,
  };
  const passwordOpts: RegisterOptions = {
    minLength: 4,
  };

  useEffect(() => {
    if (current === "authcode") {
      setInterval(() => {
        setTime((t) => Math.max(0, t - 1));
        // if (time <= 0) {
        //   clearInterval(timer);
        // }
      }, 1000);
    }
  }, [current]);

  useEffect(() => {
    if (time >= 0) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setTimeStr(minutes + ":" + seconds.toString().padStart(2, "0"));
    }
  }, [time]);

  const handleInput = () => {
    const data = getValues();
    setErrorMsg("");
    if (current === "email") {
      setValue("email", data.email, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (errors.email?.type === "required") {
        setErrorMsg("이메일을 입력해 주세요.");
      } else if (errors.email?.type === "pattern") {
        setErrorMsg("올바른 이메일을 입력해 주세요.");
      } else if (isDirty && errors.email === undefined) {
        axios
          .post("/users/authcode/", data)
          .then((response) => {
            console.log(response);
            reset({ ...data }, { keepDirty: false });
            alert(response.data.authcode);
            setCurrent("authcode");
            setBtnLabel("인증코드 입력");
          })
          .catch((err) => {
            console.log(err);
            setErrorMsg(err.response.data.message);
          });
      }
    } else if (current === "authcode") {
      setValue("authcode", data.authcode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (isDirty && errors.authcode === undefined) {
        axios
          .put("/users/authcode/", data)
          .then(() => {
            reset({ ...data }, { keepDirty: false });
            setCurrent("password");
            setBtnLabel("비밀번호 변경");
          })
          .catch((err) => {
            setErrorMsg(err.response.data.message);
          });
      }
    } else if (current === "password") {
      if (errors.password?.type === "minLength") {
        setErrorMsg("형식에 맞는 비밀번호를 입력해 주세요.");
      } else if (isDirty && errors.password === undefined) {
        axios
          .post("/users/password/", data)
          .then(() => {
            nav("/signin");
          })
          .catch((err) => {
            setErrorMsg(err.response.data.message);
          });
      }
    }
  };

  return (
    <form className="password-form">
      <img className="form-content-icon" src={LockIcon} alt="LockIcon"></img>
      <div className="form-content-title">로그인에 문제가 있나요?</div>
      <div className="form-content-subtitle">
        이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 인증코드를
        보내드립니다.
      </div>
      {current === "email" && (
        <input
          className="form-input"
          type="email"
          placeholder="이메일"
          {...register("email", emailOpts)}
          required
        ></input>
      )}
      {current === "authcode" && (
        <>
          <input
            className="form-input"
            type="text"
            minLength={6}
            maxLength={6}
            placeholder="인증코드"
            {...register("authcode", authcodeOpts)}
            required
          ></input>
          <span className="form-expired">{timeStr}</span>
        </>
      )}
      {current === "password" && (
        <input
          className="form-input"
          type="password"
          placeholder="비밀번호"
          {...register("password", passwordOpts)}
          required
        ></input>
      )}
      <button
        className="form-btn form-btn-blue"
        type="button"
        onClick={handleInput}
      >
        {btnLabel}
      </button>
      <Link className="signup-link noline-link" to="/signup">
        새 계정 만들기
      </Link>
      {errorMsg !== "" && <div className="form-error">{errorMsg}</div>}
      <button
        className="form-btn form-btn-bottom"
        onClick={() => nav("/signin")}
      >
        로그인으로 돌아가기
      </button>
    </form>
  );
};

export default PasswordForm;
