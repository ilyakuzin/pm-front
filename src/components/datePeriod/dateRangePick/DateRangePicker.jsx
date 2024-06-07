import { ru } from 'date-fns/locale'
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import './dateRangePicker.scss'
import style from './dateRangePicker.module.scss'
import DateRangeFooter from './dateRangeFooter/DateRangeFooter';


export default function DateRangePicker({open, onClose, onChange, styles='date-range-picker'}) {

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
        <div className={styles}>
            <div>
                <DayPicker 
                    mode='range'
                    numberOfMonths={2}
                    selected={selectedRange}
                    onSelect={handleRangeSelect}
                    locale={ru}
                    modifiersClassNames={{
                        range_middle: style.range_middle
                    }}
                />
                <DateRangeFooter 
                    range={selectedRange}
                    onSubmit={() => {onChange(fromValue, toValue)}}
                    onClose={onClose}
                    onReset={() => setSelectedRange({from: undefined, to: undefined})}
                />
            </div>
        </div>
    )
}