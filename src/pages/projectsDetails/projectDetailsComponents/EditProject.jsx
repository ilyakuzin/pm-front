import "./editProject.scss";
import closeBtn from "../../../resources/icons/CloseBtn.png";
import { useState, useEffect } from "react";
import Fade from "react-reveal";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../../../store/thisUserReducer";
import Selection from "../../../components/people/selection/Selection"
import getManagersReq from "../../../data/Users/getManagersReq.ts";
import GetProjectReq from "../../../data/Projects/GetProject.ts";
import UpdateProject from "../../../data/Projects/UpdateProject.ts";
import DatePick from "../../../components/datePick/DatePick";
import CurrencyInput from 'react-currency-input-field';
import calendar from '../../../resources/icons/calendar.png';

const EditProject = ({ open, onClose, idProject }) => {
  const host = 'http://deploy-project-management.herokuapp.com/';
  const token = useSelector(selectAccessToken);
  const { id } = useParams();

  const [manager, setManager] = useState('');
  const [status, setStatus] = useState({});
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [projectName, setProjectName] = useState('');
  const [comments, setComments] = useState('');
  const [currencyValue, setCurrencyValue] = useState(0);
  const [timeValue, setTimeValue] = useState(0);
  const [costValue, setCostValue] = useState(0);

  const getProjectInfo = async (curId) => {
    let data = await GetProjectReq(curId);

    if (data.cost) {
      setCostValue(data.cost);
    }
    if (data.comments.length !== 0) {
      setComments(data.comments[data.comments.length - 1].comment);
    }
    setProjectName(data.name);
    setStatus(data.status.statusName);
    setCurrencyValue(data.evaluationByHour);
    setTimeValue(data.evaluationOfProject);
  }

  useEffect(() => {
    if (idProject) {
      getProjectInfo(idProject);
    } else {
      getProjectInfo(id);
    }
  }, [id, idProject])


  const updateProject = async () => {
    const ProjectData = await UpdateProject({
      name: projectName,
      manager: manager.id,
      deadline: date,
      status: status,
      evaluationOfProject: timeValue,
      evaluationByHour: currencyValue,
      comments: comments,
      cost: costValue,
    }, id || idProject, token);
    if (ProjectData.status) {
      onClose();
      window.location.reload();
    }
  }

  const [managers, setManagers] = useState([]);
  const getManagers = async () => {
    let newManagers = await getManagersReq(token);
    for (let i = 0; i < newManagers.length; i++) {
      managers[i] = {
        value: newManagers[i].user,
        label: <div className="manager-name"><img alt="" src={host + newManagers[i].user.avatar} height="8%" width="8%" />{newManagers[i].user.surname + " " + newManagers[i].user.firstName}</div>,
      }
    }
  }

  const [projectNameError, setProjectNameError] = useState('');
  const [valueError, setValueError] = useState('');
  const [currencyValueError, setСurrencyValueError] = useState('');
  const [timeValueError, setTimeValueError] = useState('');
  const [costValueError, setCostValueError] = useState('');

  const [projectNameValid, setProjectNameValid] = useState(true);
  const [valueValid, setValueValid] = useState(true);
  const [currencyValueValid, setСurrencyValueValid] = useState(true);
  const [timeValueValid, setTimeValueValid] = useState(true);
  const [costValueValid, setCostValueValid] = useState(true);

  const [formValid, setFormValid] = useState(true);
  const [openDate, setOpenDate] = useState(false);

  getManagers();

  useEffect(() => {
    if (projectNameValid && currencyValueValid && timeValueValid && costValueValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [projectNameValid, currencyValueValid, timeValueValid, costValueValid])

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

  const costHandler = (value) => {
    setCostValue(value);

    if (value !== undefined) {
      setCostValueError('');
      setCostValueValid(true);
    } else {
      setCostValueError('Обязательное поле');
      setCostValueValid(false);
    }
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
      <div onClick={() => onClose()} className="editProject">
        <form onClick={(e) => e.stopPropagation()} className='edit-project-container'>

          <div className='add-project_container_title'>
            <h1>Редактировать проект</h1>
            <a className='add-project_container_link' onClick={() => onClose()}><img className='edit-project_container_image' src={closeBtn} /></a>
          </div>

          <div className="text-fields">
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

          <div className="text-fields">
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

          <div className="text-fields">
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

          <div className="text-both">
            <p className="date">Срок по договору</p>
            <p className="cost">Стоимость</p>
          </div>

          <div className="text-fields-both">
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
              <img alt="" src={calendar} className='calendar-icon' onClick={() => setOpenDate((isOpen) => !isOpen)}></img>
              {openDate && <DatePick onClose={closeCalendar} date={date} setDate={setDate} setValue={projectDateHandler} />}
            </div>
            {valueError && <div className="input-wrong">{valueError}</div>}
            <div className={!costValueError ? 'modal--input' : 'modal--input_wrong'}>
              <CurrencyInput
                id="cost-input"
                name="cost-input-name"
                placeholder="Введите сумму"
                value={costValue}
                decimalsLimit={2}
                prefix='₽ '
                onValueChange={(value) => { costHandler(value) }}
              />
            </div>
          </div>
          {costValueError && <div className="input-wrong-date">{costValueError}</div>}

          <div className="text-both-bottom">
            <p className="date">Оценка за 1 час</p>
            <p className="cost-dif">Оценка проекта</p>
          </div>

          <div className="text-fields-both">
            <div className={!currencyValueError ? 'modal--input' : 'modal--input_wrong'}>
              <CurrencyInput
                id="currency-input"
                name="currency-input-name"
                placeholder="Введите сумму"
                value={currencyValue}
                decimalsLimit={2}
                prefix='₽ '
                onValueChange={(value) => { currencyHandler(value) }}
              />
            </div>
            <div className={!timeValueError ? 'modal--input' : 'modal--input_wrong'}>
              <CurrencyInput
                id="time-input"
                name="time-input-name"
                placeholder="Введите кол. часов"
                value={timeValue}
                decimalsLimit={2}
                suffix={' ч.'}
                onValueChange={(value) => timeHandler(value)}
              />
            </div>
          </div>
          {currencyValueError && <div className="input-wrong-cur">{currencyValueError}</div>}
          {timeValueError && <div className="input-wrong-hour">{timeValueError}</div>}

          <div className="text-fields">
            <p>Комментарии</p>
            <div className="modal--input--comment">
              <textarea
                onChange={(e) => setComments(e.target.value)}
                value={comments}
                type={'text'}
                placeholder={'Введите текст'}
              />
            </div>
          </div>

          <div className={formValid ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
            <button
              className={formValid ? 'modal-button' : 'modal-button modal-button-disabled'}
              onClick={() => {
                updateProject();
                onClose();
              }}
              disabled={!formValid}
            >Сохранить</button>
          </div>

        </form>
      </div>
    </Fade>
  )
}

export default EditProject;