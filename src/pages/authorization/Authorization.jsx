import "./authorization.scss";
import logoAuth from "../../resources/icons/logoAuth.svg";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginReq from "../../data/Auth/login.ts"
import { useDispatch } from "react-redux";
import { login as SignIn } from "../../store/thisUserReducer";

const Authorization = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWrong, setEmailWrong] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState('Заполните поле "Email"');
  const [passwordError, setPasswordError] = useState('Заполните поле "Пароль"');

  const login = async () => {
    let UserData = await loginReq(email, password);
    if (UserData.accessToken) {
      window.localStorage.setItem('userData',JSON.stringify(UserData));
      dispatch(SignIn({
        accessToken: UserData.accessToken,
        refreshToken: UserData.refreshToken,
        user: {
          id:UserData.user.id,
          roles:UserData.user.roles
        }
      }));
      navigate('/');
    } else {
      console.log(UserData.message);
    }
  }

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailWrong(true);
        break;
      case "password":
        setPasswordWrong(true);
        break;
      default:
        break;
    }
  }

  const emailHandler = (event) => {
    setEmail(event.target.value);
    const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (!regularExpression.test(String(event.target.value).toLowerCase())) {
      setEmailError("Недействительный адрес электронной почты");
      if (event.target.value === "") {
        setEmailError('Заполните поле "Email"');
      }
    } else {
      setEmailError("");
    }
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    const regularExpression = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!regularExpression.test(String(event.target.value))) {
      setPasswordError("Недействительный пароль")
      if (event.target.value === "") {
        setPasswordError('Заполните поле "Пароль"');
      }
    } else {
      setPasswordError("");
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <img
          className="logo"
          src={logoAuth}
          alt=""
        />
        <p className="entrance">Войти в профиль</p>

        <div className="login">
          <p>Email</p>
          <Input
            valid={emailWrong && emailError}
            onChange={emailHandler}
            onBlur={blurHandler}
            placeName="name@company.com"
            type="text"
            name="email"
            value={email}
          />
          {(emailWrong && emailError) && <div className="emailWrong">{emailError}</div>}
        </div>

        <div className="password">
          <p>Пароль</p>
          <Input
            valid={passwordWrong && passwordError}
            onBlur={blurHandler}
            onChange={passwordHandler}
            placeName="password"
            type="password"
            name="password"
            value={password}
            login={login}
          />
          {(passwordWrong && passwordError) && <div className="passwordWrong">{passwordError}</div>}
        </div>

        <Link to="/forgot">
          <p className="forgotPassword">Забыли пароль?</p>
        </Link>

        <Button disState={!formValid} login={login} value="Войти" />

      </div>
    </div>
  )
}

export default Authorization;