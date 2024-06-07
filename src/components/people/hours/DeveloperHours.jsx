import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { ru } from 'date-fns/locale'
import getUserHours from '../../../data/Users/getUserHours.ts'
import DateRangePicker from '../../datePeriod/dateRangePick/DateRangePicker'
import arrowLeft from '../../../resources/icons/arrowLeft.svg'
import arrowRight from '../../../resources/icons/arrowRight.svg'
import './developerHours.scss'
import getProjectsForDeveloper from '../../../data/Projects/GetProjectsForDeveloper.ts'
import DeveloperTable from './developerTable/DeveloperTable'
import PickHours from './pickHours/PickHours'

export default function DeveloperHours ({token, id}) {
    
    const [data, setData] = useState()
    const [projects, setProjects] = useState()

    const dayMinus7 = () => {
        const nowDay = new Date()
        nowDay.setDate(nowDay.getDate() - 7)
        return(nowDay)
    }
    
    const formatDate =(date) => {
        return (format(date, 'PP', {locale: ru}))
    }

    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [date1, setDate1] = useState(dayMinus7())
    const [date2, setDate2] = useState(new Date())
    const [datesArray, setDatesArray] = useState([])

    const getProjectsNames = (projs) => {
        const result = projs.map((proj) => {
            return proj.name}
        )
        return result
    }

    const printPickHours = () => {
        if ((projects !== undefined) && (projects !== null)) {

            const projectNames = getProjectsNames (projects)
            const listOptions = projectNames.map((elem) => ({value: elem, label: elem}))

            return <PickHours projectList={listOptions} onReload = {onReload}/>
        }
    }
    

    const onChangeDates = async (newDate1, newDate2) => {
        setDate1(newDate1)
        setDate2(newDate2)
    }

    const getHoursData = async () => {
        const newData = await getUserHours(token, date1, date2)
        const newProjects = await getProjectsForDeveloper (token)
        setData(newData)
        setProjects(newProjects)
    }

    useEffect(() => {
        getHoursData()
        setDatesArray(getDates(date1, date2))
    }, [date1, date2])

    const onReload = () => {
        getHoursData()
        setDatesArray(getDates(date1, date2))
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    function printData() {
        if (data !== undefined && projects !== undefined) {
        return (
            <DeveloperTable
                dates = {datesArray}
                hours = {data}
                projects = {projects}
                onReload = {onReload}
            />
        )}
    }

    return (
        <div>
            

            <div
                className='buttons-for-developer'
            >
                <div
                    className='time-button-for-datepicker' 
                    onClick={() => setIsPickerOpen(value => !value)}
                >
                    <img
                        src={arrowLeft} alt={"change"}
                    />
                    <div className='dates-in-button'>
                        <p>{`${formatDate(date1)}`}</p>
                        <p>-</p>
                        <p>{`${formatDate(date2)}`}</p>
                    </div>
                    <img
                        src={arrowRight}
                        alt={"change"}
                    />
                </div>

                {printPickHours()}
                
            </div>

            <div className='dates-table'>
                {printData()}
            </div>
            
            
            <DateRangePicker
                open={isPickerOpen}
                onClose={() => setIsPickerOpen((value) => !value)}
                onChange={onChangeDates}
                styles={'date-range-picker_for-developer'}
            />
        </div>
    )
}