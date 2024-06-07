import "./editWindow.scss";
import Fade from 'react-reveal/Fade';
import { useState, useEffect } from 'react';
import DatePick from "../datePick/DatePick";
import CurrencyInput from 'react-currency-input-field';
import closeBtn from "../../resources/icons/CloseBtn.png";
import calendar from '../../resources/icons/calendar.png';
import postAwardReq from "../../data/salaryTable/postAward.ts";
import putAwardReq from "../../data/salaryTable/putAward.ts";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../../store/thisUserReducer";

const EditAward = ({ user, onClose }) => {
    const host = 'http://deploy-project-management.herokuapp.com/';
    const token = useSelector(selectAccessToken);
    //const [managers, setManagers] = useState([]);


    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [numberValue, setNumber] = useState(user.award.award);
    ;
    const [valueError, setValueError] = useState('');
    const [numberError, setNumberError] = useState("");

    const [valueValid, setValueValid] = useState(false);
    const [numberValid, setNumberValid] = useState(false);

    const [formValid, setFormValid] = useState(false);
    // Состояние календаря
    const [openDate, setOpenDate] = useState(false);

    const addAward = async () => {
        const UserData = await postAwardReq({
            value: Number(numberValue),
            date: date,
            userId: user.user._id
        }, token);
        console.log(UserData);
        if (!UserData.message) {
            onClose();
        } else {
            console.log(UserData.message);
        }
    }
    const updateAward = async () => {
        const UserData = await putAwardReq({
            value: Number(numberValue),
            date: date
        },user.award._id, token);
        console.log(UserData);
        if (!UserData.message) {
            onClose();
        } else {
            console.log(UserData.message);
        }
    }
    const reqAward=()=>{
        if(user.award.isNew){
            addAward();
        }else{
            updateAward();
        }
    }

    useEffect(() => {
        if (valueValid && numberValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [valueValid, numberValid])


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

    const numberHandler = (value) => {
        setNumber(value);
        if (value !== undefined && value > 0) {
            setNumberError('');
            setNumberValid(true);
        } else {
            setNumberError('Обязательное поле');
            setNumberValid(false);
        }
    }

    const closeCalendar = () => {
        setOpenDate(false);
    }

    return (
        <Fade>
            <div onClick={() => {
                onClose();
            }} className="editWindow">
                <form onClick={(e) => e.stopPropagation()} className='edit-window_container'>

                    <div className='edit-window_container_title'>
                        <p> </p>
                        <div title={user.user.name} className='salaryUserBox'>{user.user.avatar ? <img alt="" className='mPhoto' src={host + user.user.avatar} /> : <div className='noAvatar'>{user.user.surname[0] + user.user.firstName[0]}</div>}<p>{user.user.surname + ' ' + user.user.firstName}</p></div>
                        <a className='edit-window_container_link' onClick={() => onClose()}><img className='edit-window_container_image' src={closeBtn} /></a>
                    </div>

                    <div className="text-field">
                        <p>Премия</p>

                        <div className={!numberError ? 'modal--input' : 'modal--input_wrong'}>
                            <CurrencyInput
                                id="currency-input"
                                name="currency-input-name"
                                placeholder="Введите сумму"
                                value={numberValue}
                                decimalsLimit={2}
                                prefix='₽ '
                                onValueChange={(value, name) => { numberHandler(value) }}
                            />
                        </div>
                        {numberError && <div className="input-wrong">{numberError}</div>}
                    </div>

                    <div className="text-field">
                        <p>Дата выдачи</p>
                        <div className={!valueError ? 'calendar modal--input' : 'calendar modal--input_wrong'}>
                            <input
                                className="calendar-input cursor-pointer"
                                type="text"
                                placeholder="Выберите дату"
                                onClick={() => { setOpenDate(!openDate); }}
                                readOnly={true}
                                value={value}
                                onChange={() => { }}
                            />
                            <img alt="" src={calendar} className='calendar-img' onClick={() => setOpenDate((isOpen) => !isOpen)}></img>
                            {openDate && <div className="edit-window_DatePick"><DatePick onClose={closeCalendar} date={date} setDate={setDate} setValue={projectDateHandler} /></div>}
                        </div>
                        
                        {valueError && <div className="input-wrong">{valueError}</div>}
                    </div>


                    <div className={formValid ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
                        <button
                            className={formValid ? 'modal-button' : 'modal-button modal-button-disabled'}
                            onClick={() => {
                                reqAward();
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

export default EditAward;