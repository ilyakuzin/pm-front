import "./editUser.scss";
import Selection from "../../../components/people/selection/Selection";
import Fade from 'react-reveal/Fade';
import closeBtn from "../../../resources/icons/CloseBtn.png"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../../../store/thisUserReducer";
import UpdateUser from "../../../data/Users/UpdateUser.ts";
import GetUserInfo from "../../../data/Users/GetUserInfo.ts";
import { useParams } from "react-router-dom";

export default function EditUser({ open, onClose }) {
  const token = useSelector(selectAccessToken);
  const { id } = useParams();

  const updateUser = async () => {
    let newRole = '';
    let FN = fullName.split(' ');
    switch (role) {
      case 'developer':
        newRole = 'DEVELOPER'
        break;
      case 'admin':
        newRole = 'ADMIN'
        break;
      case 'manager':
        newRole = 'MANAGER';
        break;
      case 'designer':
        newRole = 'DESIGNER';
        break;
      default:
        newRole = "no";
        break;
    }

    const UserData = await UpdateUser({
      firstName: FN[1],
      secondName: FN[2],
      surname: FN[0],
      email: email,
      phone: Number('7' + telNum),
      tgLogin: telegram,
      roles: newRole//DEVELOPER, ADMIN, MANAGER, DESIGNER
    }, id, token);
    if (UserData.user) {
      onClose();
      window.location.reload();
    } else {
      console.log(UserData.message);
    }
  }

  //Тут хранится то что записал user
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')
  const [telegram, setTelegram] = useState('')
  const [telNum, setTelNum] = useState('')

  //Тут результат проверки ввода
  const [emailValid, setEmailValid] = useState(true)
  const [fullNameValid, setFullNameValid] = useState(true)
  const [telegramValid, setTelegramValid] = useState(true)
  const [telNumValid, setTelNumValid] = useState(true)
  const [formValid, setFormValid] = useState(true)

  //Инфо об ошибках
  const [emailError, setEmailError] = useState('')
  const [fullNameError, setFullNameError] = useState('')
  const [telegramError, setTelegramError] = useState('')
  const [telNumError, setTelNumError] = useState('')

  const getUserInfo = async () => {
    let data = await GetUserInfo(token, id)
    const numberHandler = (number) => {
      let num = String(number);
      num = num.slice(1);
      return Number(num);
    }

    setFullName(data.user.surname + " " + data.user.firstName + " " + data.user.secondName);
    setEmail(data.user.email);
    setTelegram(data.user.tgLogin);
    setTelNum(numberHandler(data.user.phone));
  }

  useEffect(() => {
    getUserInfo();
  }, [id])

  const listOptions = [
    { value: 'developer', label: 'Разработчик' },
    { value: 'designer', label: 'Дизайнер' },
    { value: 'manager', label: 'Менеджер' },
    { value: 'admin', label: 'Администратор' }
  ]

  useEffect(() => {
    if (emailValid && fullNameValid && telegramValid && telNumValid && role) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailValid, fullNameValid, telegramValid, telNumValid, role]);

  if (!open) return null

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailValid(true);
        break;
      case "fullName":
        setFullNameValid(true);
        break;
      case "telegram":
        setTelegramValid(true);
        break;
      case "telNum":
        setTelNumValid(true);
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
      setEmailValid(false)
      if (event.target.value === "") {
        setEmailError('Заполните поле "Email"');
        setEmailValid(false)
      }
    } else {
      setEmailError('');
      setEmailValid(true)
    }
  }

  const fullNameHandler = (event) => {
    setFullName(event.target.value)
    const regularExpression = /^([А-Яа-яё]{1}[а-яё]{1,23})\s([А-Яа-яё]{1}[а-яё]{1,23})\s([А-Яа-яё]{1}[а-яё]{1,23})$/

    if (!regularExpression.test(String(event.target.value).toLowerCase())) {
      setFullNameError('Некорректное ФИО')
      setFullNameValid(false)
      if (event.target.value === "") {
        setFullNameError('Заполните поле "ФИО"');
        setFullNameValid(false)
      }
    } else {
      setFullNameError('');
      setFullNameValid(true)
    }
  }

  const phoneNumberHandler = (event) => {
    const formattedPhoneNumber = formatNumber(event.target.value)
    setTelNum(formattedPhoneNumber)
    if (event.target.value === '') {
      setTelNumError('Введите номер телефона')
      setTelNumValid(false)
    }
    else if (telNum.length < 13) {
      setTelNumError('Некорректный номер телефона')
      setTelNumValid(false)
    }
    else {
      setTelNumError('')
      setTelNumValid(true)
    }
  }

  const formatNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`
  }

  const selectionHandler = e => {
    setRole(e.value)
  }

  const telegramHandler = (event) => {
    const regularExpression = /[\w]{5,32}$/
    setTelegram(event.target.value)

    if (!regularExpression.test(String(event.target.value).toLowerCase())) {
      setTelegramError('Некорректный ID пользователя')
      setTelegramValid(false)
      if (event.target.value === "") {
        setTelegramError('Введите имя пользователя Telegram');
        setTelegramValid(false)
      }
    } else {
      setTelegramError('');
      setTelegramValid(true)
    }
  }

  return (
    <Fade>
      <div onClick={onClose} className='AddPeople'>

        <div onClick={(e) => {
          e.stopPropagation()
        }} className='add-people_container'>
          <div className='add-people_container_title'>
            <h1>Редактировать пользователя</h1>
            <a className='add-people_container_link' onClick={() => onClose()}><img className='add-people_container_image' src={closeBtn}></img></a>
          </div>

          <div className="text-field">
            <p>Адрес электронной почты</p>

            <div className={!emailError ? 'modal--input' : 'modal--input_wrong'}>
              <input
                onChange={emailHandler}
                onBlur={blurHandler}
                value={email}
                name={'email'}
                type={'text'}
                placeholder={'name@company.com'}
              />
            </div>
            {emailError && <div className="input-wrong">{emailError}</div>}
          </div>

          <div className="text-field">
            <p>ФИО</p>
            <div className={!fullNameError ? 'modal--input' : 'modal--input_wrong'}>
              <input
                onChange={fullNameHandler}
                onBlur={blurHandler}
                value={fullName}
                name={'name'}
                type={'text'}
                placeholder={'Иванов Иван Иванович'}
              />
            </div>
            {fullNameError && <div className="input-wrong">{fullNameError}</div>}
          </div>

          <div className="text-field">
            <p>Роль</p>
            <Selection
              classNamePrefix={'select-with-search'}
              placeholder={'Выбрать...'}
              isSearchable={true}
              value={listOptions.find(obj => obj.value === role)}
              onChange={selectionHandler}
              options={listOptions}
            />

          </div>

          <div className="text-field">
            <p>Telegram</p>

            <div className={!telegramError ? 'modal--input text-field__icon-2 tg' : 'modal--input_wrong text-field__icon-2 tg'}>
              <input
                onChange={telegramHandler}
                onBlur={blurHandler}
                value={telegram}
                name={'telegram'}
                type={'text'}
                placeholder={'exampleuser'}
              />
            </div>
            {telegramError && <div className="input-wrong">{telegramError}</div>}
          </div>

          <div className="text-field">
            <p>Телефон</p>

            <div className={!telNumError ? 'modal--input text-field__icon-2' : 'modal--input_wrong text-field__icon-2'}>
              <input
                onChange={phoneNumberHandler}
                onBlur={blurHandler}
                value={telNum}
                name={'number'}
                type={'tel'}
                placeholder={'(999) 888-7766'}
              />
            </div>
            {telNumError && <div className="input-wrong">{telNumError}</div>}
          </div>

          <div className={formValid ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
            <button className={formValid ? 'modal-button' : 'modal-button modal-button-disabled'} onClick={() => updateUser()} disabled={!formValid}>Сохранить</button>
          </div>

        </div>

      </div>
    </Fade>

  )
}