import "./registration.scss";
import logoAuth from "../../resources/icons/logoAuth.svg";
import Input from "../../components/registration/Input";
import Button from "../../components/registration/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import setPasswordReq from "../../data/Registration/setPassword.ts";
import { useDispatch } from "react-redux";
import { login } from "../../store/thisUserReducer";

const Registration = () => {
  const { link } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatWrong, setPasswordRepeatWrong] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [message, setMessage] = useState('');
  const setPass = async () => {
    let UserData = await setPasswordReq({ password: password, verifyPassword: passwordRepeat }, link);
    if (UserData.accessToken) {
      dispatch(login({
        accessToken: UserData.accessToken,
        refreshToken: UserData.refreshToken,
        user: {
          id: UserData.user.id,
          roles: UserData.user.roles
        }
      }));
      window.localStorage.setItem('userData', UserData);
      navigate('/');
    } else {
      setFormValid(false);
      setMessage(UserData.message);
    }
  }

  useEffect(() => {
    if (passwordRepeatError || passwordError || message) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordRepeatError, passwordError]);

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "password":
        setPasswordWrong(true);
        break;
      case "passwordRepeat":
        setPasswordRepeatWrong(true);
        break;
      default:
        break;
    }
  }


  const passwordHandler = (event) => {
    let pass = event.target.value;
    setPassword(pass);
    const REExtraChar = /^[0-9a-zA-Z]+$/
    const REUpperCaseLetter = /^(?=.*[A-Z]).+$/;
    const RENumber = /^(?=.*\d).+$/;
    console.log(pass === passwordRepeat);
    if (pass !== passwordRepeat) {
      setPasswordRepeatError('Пароли не совпадают');
    } else {
      setPasswordRepeatError("");
    }
    if (pass.length > 7) {
      if (RENumber.test(pass)) {
        if (REUpperCaseLetter.test(pass)) {
          if (REExtraChar.test(pass)) {
            setPasswordError("");
          } else {
            setPasswordError('Не должно быть дополнительных символов')
          }
        } else {
          setPasswordError('В пароле должны быть заглавные буквы')
        }
      } else {
        setPasswordError('В пароле должны быть цифры')
      }
    } else {
      setPasswordError('Слишком короткий пароль');
    }
  }

  const passwordRepeatHandler = (event) => {
    let pass = event.target.value;
    setPasswordRepeat(pass);

    if (pass !== password) {
      setPasswordRepeatError('Пароли не совпадают')
    } else {
      setPasswordRepeatError("");
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
        <p className="registration">Регистрация</p>

        <div className="password">
          <p>Придумайте пароль</p>
          <Input
            valid={passwordWrong && passwordError}
            onBlur={blurHandler}
            onChange={passwordHandler}
            placeName="8+ символов, 1 заглавная буква и цифра"
            type="password"
            name="password"
            value={password}
          />
          {(passwordWrong && passwordError) && <div className="passwordWrong">{passwordError}</div>}
        </div>

        <div className="password">
          <p>Повторите пароль</p>
          <Input
            valid={passwordRepeatWrong && passwordRepeatError}
            onBlur={blurHandler}
            onChange={passwordRepeatHandler}
            placeName="password"
            type="password"
            name="passwordRepeat"
            value={passwordRepeat}
          />
          {(passwordRepeatWrong && passwordRepeatError) && <div className="passwordWrong">{passwordRepeatError}</div>}
        </div>
        <p className='errorMessage'>{message}</p>
        <Button disState={!formValid} setPass={setPass} value="Войти" />

      </div>
    </div>
  )
}

export default Registration;