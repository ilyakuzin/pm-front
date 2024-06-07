import './datePeriod.scss'
import { useState } from "react";
import DateRangePicker from "./dateRangePick/DateRangePicker";
import { format } from 'date-fns';

export default function DatePeriod() {
    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [date1, setDate1] = useState(format(new Date(), 'dd.MM.yyyy'))
    const [date2, setDate2] = useState(format(new Date(), 'dd.MM.yyyy'))

    

    const onChangeDates = (newDate1, newDate2) => {
        setDate1(newDate1)
        setDate2(newDate2)
    }
    
    return (
        <div>
            <button className='time-button-for-datepicker' onClick={() => setIsPickerOpen(value => !value)}>{`${date1} - ${date2}`}</button>
            <DateRangePicker 
                open={isPickerOpen}
                onClose={() => setIsPickerOpen((value) => !value)}
                date1={date1}
                date2={date2}
                onChange={onChangeDates}
            />
        </div>
    )
}