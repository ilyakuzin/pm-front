import Button from '../../../datePick/UI/button/Button'
import './dateRangeFooter.scss'

export default function DateRangeFooter ({range, onClose, onReset, onSubmit}) {

    const approve = () => {
        onSubmit()
        onClose()
    }

    return (
        <div  className='footer-picker'>
            <Button
                classNamePrefix='btn-grey'
                label={'Сбросить'}
                onClick={onReset}
            />

            <Button 
                isDisabled={ (range === undefined || range.from === undefined || range.to === undefined || range.from === null || range.to === null) ? true : false}
                onClick={(range === undefined || range.from === undefined || range.to === undefined || range.from === null || range.to === null) ? ()=>{} : approve}
                label={'Применить'}
            />
        </div>
    )
}