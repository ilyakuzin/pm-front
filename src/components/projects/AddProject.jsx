import "./AddProject.scss";
import Fade from 'react-reveal/Fade';
import Selection from "../people/selection/Selection";
import { useState, useEffect } from 'react';
import DatePick from "../datePick/DatePick";
import CurrencyInput from 'react-currency-input-field';
import closeBtn from "../../resources/icons/CloseBtn.png";
import calendar from '../../resources/icons/calendar.png';
import getManagersReq from "../../data/Users/getManagersReq.ts";
import addProjectReq from "../../data/Projects/addProject.ts";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../../store/thisUserReducer";

const AddProject = ({ open, onClose }) => {
  const host = 'http://deploy-project-management.herokuapp.com/';
  const token = useSelector(selectAccessToken);
  const [managers, setManagers] = useState([]);

  const getManagers = async () => {
    let newManagers = await getManagersReq(token);
    for (let i = 0; i < newManagers.length; i++) {
      managers[i] = {
        value: newManagers[i].user,
        label: <div className="manager-name">{newManagers[i].user.surname + " " + newManagers[i].user.firstName}</div>,
      }
    }
  }

  const addProject = async () => {
    const ProjectData = await addProjectReq({
      name: projectName,
      manager: manager.id,
      deadline: date,
      status: status,
      evaluationOfProject: timeValue,
      evaluationByHour: currencyValue,
    }, token);
    if (ProjectData.status) {
      onClose();
      if (window.location.pathname === "/projects") {
        window.location.reload();
      }
    }
  }

  const [manager, setManager] = useState({});
  const [status, setStatus] = useState({});
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [projectName, setProjectName] = useState('');
  const [currencyValue, setCurrencyValue] = useState(0);
  const [timeValue, setTimeValue] = useState(0);

  const [projectNameError, setProjectNameError] = useState('');
  const [valueError, setValueError] = useState('');
  const [currencyValueError, setСurrencyValueError] = useState('');
  const [timeValueError, setTimeValueError] = useState('');

  const [projectNameValid, setProjectNameValid] = useState(false);
  const [valueValid, setValueValid] = useState(false);
  const [currencyValueValid, setСurrencyValueValid] = useState(false);
  const [timeValueValid, setTimeValueValid] = useState(false);

  const [formValid, setFormValid] = useState(false);
  // Состояние календаря
  const [openDate, setOpenDate] = useState(false);

  getManagers();

  useEffect(() => {
    if (projectNameValid && valueValid && currencyValueValid && timeValueValid && manager && status) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [projectNameValid, valueValid, currencyValueValid, timeValueValid, manager, status])

  if (!open) return null;

  const listEmoji = [
    { value: 'Переговоры', label: 'Переговоры 💭' },
    { value: 'Отрисовка дизайна', label: 'Отрисовка дизайна 🎨' },
    { value: 'Утверждение дизайна', label: 'Утверждение дизайна 📒' },
    { value: 'Старт программирования', label: 'Старт программирования 👨‍💻' },
    { value: 'Горит', label: 'Горит 🔥' },
    { value: 'Ждем ОС клиента', label: 'Ждем ОС клиента ⏳' },
    { value: 'Пишем инструкцию', label: 'Пишем инструкцию 📃' },
    { value: 'Внутреннее тестирование', label: 'Внутреннее тестирование ⌨️' },
    { value: 'Вносим правки', label: 'Вносим правки ✍️' },
    { value: 'Реклама', label: 'Реклама 🔈' },
    { value: 'Техподдержка', label: 'Техподдержка 🖥️' },
    { value: 'Закрыт', label: 'Закрыт ✅' },
    { value: 'Отдать в разработку', label: 'Отдать в разработку 📤' },
    { value: 'Предложить в доп. продажу', label: 'Предложить в доп. продажу 💵' },
    { value: 'Ждем оплату', label: 'Ждем оплату 💰' },
    { value: 'Обсудить проект', label: 'Обсудить проект 🗣️' },
    { value: 'Приостановлен', label: 'Приостановлен ⛔' },
  ]

  const projectNameHandler = (event) => {
    setProjectName(event.target.value);
    const regularExpression = /\S{3,}/;

    if (!regularExpression.test(String(event.target.value).toLowerCase())) {
      setProjectNameError('Минимальная длина - 3 символа')
      setProjectNameValid(false);
      if (event.target.value === "") {
        setProjectNameError('Обязательное поле');
        setProjectNameValid(false);
      }
    } else {
      setProjectNameError('');
      setProjectNameValid(true);
    }
  }

  const projectDateHandler = (value) => {
    setValue(value);
    if (value !== undefined && value !== '') {
      setValueError('');
      setValueValid(true);
    } else {
      setValueError('Обязательное поле');
      setValueValid(false);
    }
  }

  const currencyHandler = (value) => {
    setCurrencyValue(value);

    if (value !== undefined) {
      setСurrencyValueError('');
      setСurrencyValueValid(true);
    } else {
      setСurrencyValueError('Обязательное поле');
      setСurrencyValueValid(false);
    }
  }

  const timeHandler = (value) => {
    setTimeValue(value);

    if (value !== undefined) {
      setTimeValueError('');
      setTimeValueValid(true);
    } else {
      setTimeValueError('Обязательное поле');
      setTimeValueValid(false);
    }
  }

  const handleClear = () => {
    setManager('');
    setStatus('');
    setDate('');
    setValue('');
    setProjectName('');
    setCurrencyValue(0);
    setTimeValue(0);
  }

  const closeCalendar = () => {
    setOpenDate(false);
  }

  const selectionRoleHandler = e => {
    setManager(e.value);
  }

  const selectionStatusHandler = e => {
    setStatus(e.value);
  }

  return (
    <Fade>
      <div onClick={() => {
        onClose();
        handleClear();
      }} className="addProject">
        <form onClick={(e) => e.stopPropagation()} className='add-project_container'>

          <div className='add-project_container_title'>
            <h1>Создать новый проект</h1>
            <a className='add-project_container_link' onClick={() => onClose()}><img className='add-project_container_image' src={closeBtn} /></a>
          </div>

          <div className="text-field">
            <p>Название проекта</p>

            <div className={!projectNameError ? 'modal--input' : 'modal--input_wrong'}>
              <input
                onChange={projectNameHandler}
                value={projectName}
                name={'project-name'}
                type={'text'}
                placeholder={'Введите текст'}
              />
            </div>
            {projectNameError && <div className="input-wrong">{projectNameError}</div>}

          </div>

          <div className="text-field">
            <p>Менеджер</p>
            <Selection
              classNamePrefix={'select-with-search'}
              isSearchable={false}
              placeholder={'Менеджер'}
              value={managers.find(obj => obj.value === manager)}
              onChange={selectionRoleHandler}
              options={managers}
            />
          </div>

          <div className="text-field">
            <p>Статус проекта</p>
            <Selection
              classNamePrefix={'select-with-search'}
              placeholder={'Выберите статус'}
              isSearchable={false}
              value={listEmoji.find(obj => obj.value === status)}
              onChange={selectionStatusHandler}
              options={listEmoji}
            />
          </div>

          <div className="text-field">
            <p>Срок по договору</p>
            <div className={!valueError ? 'modal--input' : 'modal--input_wrong'}>
              <input
                className="cursor-pointer"
                type="text"
                placeholder="Выберите дату"
                onClick={() => { setOpenDate(!openDate); }}
                readOnly={true}
                value={value}
                onChange={() => { }}
              />
            </div>
            <img alt="" src={calendar} className='calendar-icon' onClick={() => setOpenDate((isOpen) => !isOpen)}></img>
            {valueError && <div className="input-wrong">{valueError}</div>}
            {openDate && <DatePick onClose={closeCalendar} date={date} setDate={setDate} setValue={projectDateHandler} />}
          </div>

          <div className="text-field">
            <p>Оценка за 1 час</p>

            <div className={!currencyValueError ? 'modal--input' : 'modal--input_wrong'}>
              <CurrencyInput
                id="currency-input"
                name="currency-input-name"
                placeholder="Введите сумму"
                value={currencyValue}
                decimalsLimit={2}
                prefix='₽ '
                onValueChange={(value, name) => { currencyHandler(value) }}
              />
            </div>
            {currencyValueError && <div className="input-wrong">{currencyValueError}</div>}
          </div>

          <div className="text-field">
            <p>Оценка проекта</p>

            <div className={!timeValueError ? 'modal--input' : 'modal--input_wrong'}>
              <CurrencyInput
                id="time-input"
                name="time-input-name"
                placeholder="Введите количество часов"
                value={timeValue}
                decimalsLimit={2}
                suffix={' ч.'}
                onValueChange={(value, name) => timeHandler(value)}
              />
            </div>
            {timeValueError && <div className="input-wrong">{timeValueError}</div>}
          </div>

          <div className={formValid ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
            <button
              className={formValid ? 'modal-button' : 'modal-button modal-button-disabled'}
              onClick={() => {
                addProject();
                onClose();
                handleClear();
              }}
              disabled={!formValid}
            >Создать</button>
          </div>

        </form>
      </div>
    </Fade>
  )
}

export default AddProject;