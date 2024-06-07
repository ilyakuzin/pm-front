import './pickHours.scss'
import '../../addPeople.scss'
import closeBtn from '../../../../resources/icons/CloseBtn.png'
import Selection from '../../selection/Selection'
import CurrencyInput from 'react-currency-input-field';
import addUserHours from '../../../../data/Users/addUserHours.ts'
import { format } from 'date-fns'
import { ru } from 'date-fns'
import calendar from '../../../../resources/icons/calendar.png'
import DatePick from '../../../datePick/DatePick'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectAccessToken } from '../../../../store/thisUserReducer';

export default function PickHours({ projectList, onReload }) {
    const token = useSelector(selectAccessToken)
    const [isOpen, setIsOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false);
    const [dateValue, setDateValue] = useState('')

    const onClose = () => {
        setIsOpen((value) => !value)
    }

    const closeCalendar = () => {
        setOpenDate(false);
    }

    const removeLastDot = (str) => {
        if (typeof str === 'string') { if (str?.slice(-1) === '.') { return Number(str?.slice(0, -1)) } else return Number(str) }
        else { return Number(str) }
    }

    const addHour = async () => {
        if (description) {
            const UserData = await addUserHours({
                projectName: projectName,
                quantity: removeLastDot(quantity),
                date: dateValue,
                description: description
            }, token);
        }
        else {
            const UserData = await addUserHours({
                projectName: projectName,
                quantity: removeLastDot(quantity),
                date: dateValue,
            }, token);
        }
    }

    //Тут хранится то что записал user
    const [projectName, setProjectName] = useState()
    const [quantity, setQuantity] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState()

    //Тут результат проверки ввода
    const [projectNameValid, setProjectNameValid] = useState(false)
    const [quantityValid, setQuantityValid] = useState(false)
    const [dateValid, setDateValid] = useState(false)
    const [formValid, setFormValid] = useState(false)

    //Инфо об ошибках
    const [projectNameError, setProjectNameError] = useState('Необходимо выбрать название проекта')
    const [quantityError, setQuantityError] = useState('')
    const [dateError, setDateError] = useState('')


    useEffect(() => {
        if (projectNameValid && quantityValid && dateValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [projectNameValid, quantityValid, dateValid]);


    const projectNameHandler = (event) => {
        setProjectName(event.value);
        setProjectNameError('');
        setProjectNameValid(true)
    }

    const handleClear = () => {
        setProjectName('');
        setQuantity();
        setDate();
        setDateValue();
        setDescription('');


        setTimeout(onReload, 1000);

        setProjectNameValid(false)
        setQuantityValid(false)
        setDateValid(false)
        setFormValid(false)

        setProjectNameError('Необходимо выбрать название проекта')
        setQuantityError('')
        setDateError('')

    }

    const dateHandler = (value) => {
        setDateValue(value);
        if (value !== undefined && value !== '' && value !== null) {
            setDateError('');
            setDateValid(true);
        } else {
            setDateError('Обязательное поле');
            setDateValid(false);
        }
    }

    const quantityHandler = (value) => {
        setQuantity(value);
        if ((value !== undefined) && (value !== null)) {
            if (value.indexOf('.') !== -1) {
                if (Number(value?.substring(0, value.indexOf('.'))) >= 24) {
                    setQuantityError('Введите корректное значение');
                    setQuantityValid(false);
                }
            } else {
                if (Number(value) >= 24) {
                    setQuantityError('Введите корректное значение');
                    setQuantityValid(false);
                }
                else if (Number(value) === 0) {
                    setQuantityError('Введите ненулевое значение');
                    setQuantityValid(false);
                } else if (Number(value) < 0) {
                    setQuantityError('Введите корректное значение');
                    setQuantityValid(false);
                }
                else {
                    setQuantityError('');
                    setQuantityValid(true);
                }
            }

        } else {
            setQuantityError('Обязательное поле');
            setQuantityValid(false);
        }
    }

    return (
        <div>
            <div onClick={() => onClose()} className='pick-a-date'>
                <p>Отметить время</p>
            </div>

            {isOpen &&
                <div onClick={() => onClose()} className='AddPeople'>
                    <div onClick={(e) => { e.stopPropagation() }} className='pick-hours_container'>

                        <div className='add-people_container_title'>
                            <h1>Отметить время</h1>
                            <a className='add-people_container_link' onClick={() => onClose()}><img className='add-people_container_image' src={closeBtn}></img></a>
                        </div>

                        <div className="text-field_selection">
                            <p>Проект</p>
                            <div>
                                <Selection
                                    classNamePrefix={'select-without-search'}
                                    isSearchable={false}
                                    placeholder={'Выберите из списка'}
                                    value={projectList.find(obj => obj.value === projectName)}
                                    onChange={projectNameHandler}
                                    options={projectList}
                                />
                            </div>
                            {projectNameError && <div className="input-wrong">{projectNameError}</div>}
                        </div>



                        <div className='text-field-with-two-inputs'>
                            <div className="text-field_1">
                                <p>Дата</p>
                                <div className={!dateError ? 'modal--input_date' : 'modal--input_date_wrong'}>
                                    <input
                                        type="text"
                                        placeholder="Выберите дату"
                                        onClick={() => { setOpenDate(!openDate); }}
                                        readOnly={true}
                                        value={dateValue}
                                        onChange={() => { }}
                                    />
                                </div>
                                {/* <img alt="" src={calendar} className='calendar-icon' onClick={() => setOpenDate((isOpen) => !isOpen)}></img> */}
                                {dateError && <div className="input-wrong">{dateError}</div>}
                                {openDate && <DatePick onClose={closeCalendar} date={date} setDate={setDate} setValue={dateHandler} dateFormat={'yyyy-MM-dd'} styles={'window-modal_2'} />}
                            </div>

                            <div className="text-field_2">
                                <p>Часы</p>

                                <div className={!quantityError ? 'modal--input' : 'modal--input_wrong'}>
                                    <CurrencyInput
                                        id="time-input"
                                        name="time-input-name"
                                        placeholder="0 часов"
                                        value={quantity}
                                        decimalsLimit={2}
                                        decimalSeparator="."
                                        suffix={' ч.'}
                                        onValueChange={(value, name) => quantityHandler(value)}
                                    />
                                </div>
                                {quantityError && <div className="input-wrong">{quantityError}</div>}
                            </div>
                        </div>

                        <div className="text-field">
                            <p>Описание</p>
                            <div className='modal--input'>
                                <input
                                    className="cursor-pointer"
                                    type="text"
                                    placeholder="Введите текст"
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                />
                            </div>
                        </div>

                        <div className={formValid ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
                            <button
                                className={formValid ? 'modal-button' : 'modal-button modal-button-disabled'}
                                onClick={() => {
                                    addHour();
                                    onClose();
                                    handleClear();
                                }}
                                disabled={!formValid}
                            >Отметить время</button>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}