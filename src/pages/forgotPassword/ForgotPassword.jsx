import "./forgotPassword.scss";
import logoAuth from "../../resources/icons/logoAuth.svg";
import backButton from "../../resources/icons/backButton.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../authorization/UI/button/Button";
import Input from "../authorization/UI/input/Input";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [emailWrong, setEmailWrong] = useState(false);
  const [formSended, setFormSended] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState('Заполните поле "Email"');

  useEffect(() => {
    if (emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError]);

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailWrong(true);
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

  return (
    <div className="wrapper-forgot">
      <div className="container-forgot">
        <Link to="/login">
          <img className="back" src={backButton} alt="Вернуться назад" />
        </Link>
        <img
          className="logo"
          src={logoAuth}
          alt=""
        />
        <p className="entrance">{formSended ? "Письмо выслано" : "Забыли пароль?"}</p>


        {!formSended ?
          <div className="login">
            <p>Email</p>
            <Input
              valid={emailError && emailWrong}
              onChange={emailHandler}
              onBlur={blurHandler}
              placeName="name@company.com"
              type="text"
              name="email"
              value={email}
            />
            {(emailError && emailWrong) && <div className="emailWrong">{emailError}</div>}
          </div>
          :
          <div className="message">
            <p>
              На почту <span className="email">{email}</span> отправлено письмо
              с инструкцией по восстановлению пароля.
            </p>
          </div>
        }


        {!formSended ?
          <div onClick={() => setFormSended(!formSended)}>
            <Button disState={!formValid} value="Отправить письмо" />
          </div>
          :
          <Link to="/login">
            <Button value="Вернуться ко входу" />
          </Link>
        }
      </div>
    </div>
  )
}

export default ForgotPassword;