import './report.scss'
import { useEffect, useState } from "react";
import SalaryTable from "../../../components/report/SalaryTable";
import TimeTable from "../../../components/report/TimeTable/TimeTable";
import arrowLeft from '../../../resources/icons/arrowLeft.svg';
import arrowRight from '../../../resources/icons/arrowRight.svg';
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import DateRangePickerForMonth from '../../../components/datePeriod/dateRangePick/DateRangePickerForMonth';
import DateRangePicker from '../../../components/datePeriod/dateRangePick/DateRangePicker';

const AdminReport = () => {
  const [isTimeTable, setTimeTable] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const LastDayOfMonth = () => {
    const nowDay = new Date();
    //nowDay.setMonth(nowDay.getMonth()-1);
    return (new Date(nowDay.getFullYear(), nowDay.getMonth() + 1, 0))
  }
  const FirstDayOfMonth =()=>{
    const nowDay = new Date();
    //nowDay.setMonth(nowDay.getMonth()-1);
    nowDay.setDate(1);
    return (nowDay)
  }
  const [date1, setDate1] = useState(FirstDayOfMonth());
  const [date2, setDate2] = useState(LastDayOfMonth());
  const formatDate = (date) => {
    return (format(date, 'PP', { locale: ru }))
  }
  const onChangeDates = async (newDate1, newDate2) => {
    setDate1(newDate1)
    setDate2(newDate2)
  }


  return (
    <div className="adminReport">
      <div className='adminReportHeader'>
        <div
          className='buttons-for-developer'
        >
          <div
            className='time-button-for-datepicker'
            onClick={() => setIsPickerOpen(value => !value)}
          >
            <img
              src={arrowLeft}
            />
            <div className='dates-in-button'>
              <p>{`${formatDate(date1)}`}</p>
              <p>-</p>
              <p>{`${formatDate(date2)}`}</p>
            </div>
            <img
              src={arrowRight}
            />
          </div>
        </div>

        <div className="adminReportSliderWithHeaders">
          <p>Зарплата</p>
          <div className='slider unactive' onClick={(e) => {
            if (!isTimeTable) {
              e.currentTarget.className = 'slider active';
            } else {
              e.currentTarget.className = 'slider unactive';
            }
            setTimeTable(!isTimeTable);
          }}>
            <div className="sliderCircle" />
          </div>
          <p>Время</p>
        </div>
      </div>
      <div className='dateRangePicker'>
        {isTimeTable ?
          <DateRangePicker
            open={isPickerOpen}
            onClose={() => setIsPickerOpen((value) => !value)}
            onChange={onChangeDates}
          /> :
          <DateRangePickerForMonth
            open={isPickerOpen}
            onClose={() => setIsPickerOpen((value) => !value)}
            onChange={onChangeDates}
          />}
      </div>
      {isTimeTable ? <TimeTable date1={date1} date2={date2} /> : <SalaryTable date1={date1} date2={date2} />}
    </div >
  )
}

export default AdminReport;