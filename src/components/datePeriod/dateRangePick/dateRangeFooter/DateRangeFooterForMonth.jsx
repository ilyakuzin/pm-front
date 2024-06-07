import { fromUnixTime } from 'date-fns'
import Button from '../../../datePick/UI/button/Button'
import './dateRangeFooter.scss'

export default function DateRangeFooter({ range, onClose, onReset, onSubmit }) {

    const approve = () => {
        onSubmit()
        onClose()
    }
    const checkDates = (range) => {
        let from = new Date(range.from);
        let to = new Date(range.to);
        console.log('from='+from+' to='+to);
        return from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();
    }

    return (
        <div className='footer-picker'>
            <Button
                classNamePrefix='btn-grey'
                label={'Сбросить'}
                onClick={onReset}
            />

            <Button
                isDisabled={(range === undefined || range.from === undefined || range.to === undefined || range.from === null || range.to === null || !checkDates(range)) ? true : false}
                onClick={(range === undefined || range.from === undefined || range.to === undefined || range.from === null || range.to === null || !checkDates(range)) ? () => { } : approve}
                label={'Применить'}
            />
        </div>
    )
}