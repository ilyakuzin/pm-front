import { useEffect, useState } from 'react'
import './changeHours.scss'
import closeBtn from '../../../../resources/icons/CloseBtn.png'
import CurrencyInput from 'react-currency-input-field'
import DatePick from '../../../datePick/DatePick'
import putHour from '../../../../data/Users/putHour.ts'
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/thisUserReducer';

export default function ChangeHours({ projectName, date, hours, onReload, onClose, onCloseEditor, hoursId, description }) {
    const token = useSelector(selectAccessToken)

    const [quantity, setQuantity] = useState(hours)
    const [newDescription, setNewDescription] = useState(description)

    const [quantityValid, setQuantityValid] = useState(true)
    const [formValid, setFormValid] = useState(false)

    const [quantityError, setQuantityError] = useState('')

    useEffect(() => {
        if (quantityValid) setFormValid(true)
    }, [quantityValid])

    const editHour = async () => {
        console.log(`hoursId: '${hoursId}'; quantity: ${removeLastDot(quantity)}; description: '${newDescription}'`)
        if (newDescription) {
            const updateHour = await putHour(
                {
                    quantity: removeLastDot(quantity),
                    description: newDescription
                }, token, hoursId
            )
        } else {
            const updateHour = await putHour(
                {
                    quantity: removeLastDot(quantity),
                    description: null
                }, token, hoursId
            )
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

    const removeLastDot = (str) => {
        if (typeof str === 'string') { if (str?.slice(-1) === '.') { return Number(str?.slice(0, -1)) } else return Number(str) }
        else { return Number(str) }
    }

    const handleClear = () => {
        setQuantity();
        setNewDescription('');

        setTimeout(onReload, 1000);

        setQuantityValid(false)
        setFormValid(false)

        setQuantityError('')

    }

    return (
        <div>
            <div onClick={() => onCloseEditor()} className='AddPeople'>
                <div onClick={(e) => { e.stopPropagation() }} className='pick-hours_container'>

                    <div className='add-people_container_title'>
                        <h1>Редактировать время</h1>
                        <a className='add-people_container_link' onClick={() => onCloseEditor()}><img className='add-people_container_image' src={closeBtn}></img></a>
                    </div>

                    <div className="text-field">
                        <p>Проект</p>
                        <div className='modal--input-readOnly'>
                            <input
                                className="cursor-pointer"
                                type="text"
                                readOnly={true}
                                placeholder={projectName}
                            ></input>
                        </div>
                    </div>



                    <div className='text-field-with-two-inputs'>
                        <div className="text-field_1">
                            <p>Дата</p>
                            <div className={'modal--input-readOnly'}>
                                <input
                                    type="text"
                                    placeholder={date}
                                    onClick={() => { }}
                                    readOnly={true}
                                />
                            </div>
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
                                value={newDescription}
                                onChange={(event) => { setNewDescription(event.target.value) }}
                            />
                        </div>
                    </div>

                    <div className={formValid ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
                        <button
                            className={formValid ? 'modal-button' : 'modal-button modal-button-disabled'}
                            onClick={() => {
                                editHour();
                                onCloseEditor();
                                handleClear();
                            }}
                            disabled={!formValid}
                        >Применить</button>
                    </div>

                </div>
            </div>
        </div>
    )
}