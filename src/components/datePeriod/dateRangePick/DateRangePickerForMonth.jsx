import { ru } from 'date-fns/locale'
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import './dateRangePicker.scss'
import style from './dateRangePicker.module.scss'
import DateRangeFooterForMonth from './dateRangeFooter/DateRangeFooterForMonth';


export default function DateRangePickerForMonth({open, onClose, onChange}) {

    const [selectedRange, setSelectedRange] = useState({from: null, to: null});
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');


    const handleRangeSelect = (range) => {
        setSelectedRange(range);
        if (range === null || range === void 0 ? void 0 : range.from) {
            setFromValue(range.from);
        }
        else {
            setFromValue('');
        }
        if (range === null || range === void 0 ? void 0 : range.to) {
            setToValue(range.to);
        }
        else {
            setToValue('');
        }
    };

    if (open)
    return(
        <div className='date-range-picker'>
            <div>
                <DayPicker 
                    mode='range'
                    numberOfMonths={1}
                    selected={selectedRange}
                    onSelect={handleRangeSelect}
                    locale={ru}
                    modifiersClassNames={{
                        range_middle: style.range_middle
                    }}
                />
                <DateRangeFooterForMonth 
                    range={selectedRange}
                    onSubmit={() => {onChange(fromValue, toValue)}}
                    onClose={onClose}
                    onReset={() => setSelectedRange({from: undefined, to: undefined})}
                />
            </div>
        </div>
    )
}