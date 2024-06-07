import { DayPicker } from 'react-day-picker';
import { Fade } from 'react-reveal';
import format from 'date-fns/format'
import { ru } from 'date-fns/locale'
import { useRef, useEffect } from 'react';
import 'react-day-picker/dist/style.css';
import "./datePick.scss";


const DatePick = ({onClose, date, setDate, setValue, dateFormat='PP', styles='window-modal'}) => {

  const ref = useRef()

  useEffect(() => {
    let handler = (event) => {
      if (!ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  const onChange = (date) => {
    setDate(date)
    onClose(false)
    if (date) {
      setValue(format(date, dateFormat, {locale: ru}))
    }
    else {
      setValue('')
    }
  }

  return (
    <Fade>
      <div  className={styles}>
        <div ref={ref} >
          <DayPicker
            mode='single'
            locale={ru}
            selected={date}
            onSelect={onChange}
          />
        </div>
      </div>
    </Fade>
  );
}

export default DatePick;
