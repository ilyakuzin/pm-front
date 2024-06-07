import './TimeTable.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import getDataForTimeTable from '../../../data/Projects/getDataForTimeTable.ts';
import { selectAccessToken } from '../../../store/thisUserReducer';
import TimeTableSidebarListElem from './TimeTableSidebarListElem';
import { format } from "date-fns";
import { ru } from "date-fns/locale";
//import './SalaryTable.scss'
export default function TimeTable(props) {
    const token = useSelector(selectAccessToken);
    //const [AllProjects, setAllProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState();
    const [sideRows, setSideRows] = useState();
    const [Sum, setSum] = useState([])
    const [datesArray, setDatesArray] = useState([])
    const [headerList, setHeader] = useState();
    const [body, setBody] = useState()
    const [footer,setFooter]=useState();

    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    useEffect(() => {
        setDatesArray(getDates(props.date1, props.date2))
    }, [props.date1, props.date2])

    const loadUsers = async () => {
        let data = await getDataForTimeTable(token, props.date1, props.date2);
        if (data.hoursData) {
            //setAllProjects(data);
            setUsers(data.hoursData);
        } else {
            setUsers([]);
        }
    };
    useEffect(() => {
        loadUsers();
    }, [props.date1, props.date2]);


    useEffect(() => {
        let sum = 0;
        let newBody = [];
        let SumHours =  datesArray.map((date => { return { date: date, quantity: 0 } }));
        let list = users.map((user) => {
            let hoursByDay = datesArray.map((date => { return { date: date, quantity: 0 } }));
            sum += user.sum;
            let newProjectBody = [];
            user.projectData.map((project) => {

                let newHours = datesArray.map((date => { return { date: date, quantity: 0 } }));
                project.hours.map((projectHour) => {
                    newHours.forEach((hour) => {
                        let newDate = new Date(projectHour.date);
                        if (hour.date.toLocaleDateString() === newDate.toLocaleDateString()) {
                            hour.quantity += projectHour.quantity;
                        }
                    })
                    hoursByDay.forEach((hour) => {
                        let newDate = new Date(projectHour.date);
                        if (hour.date.toLocaleDateString() === newDate.toLocaleDateString()) {
                            hour.quantity += projectHour.quantity;
                        }
                    })
                })
                console.log(newHours)
                project.fullHours = newHours;
                let newList = newHours.map((elem) => (
                    <div style={{ width: `calc(100% / ${datesArray.length})`, minWidth: "130px", backgroundColor: `${(format(elem.date, 'EE', { locale: ru }) === 'суб') || (format(elem.date, 'EE', { locale: ru }) === 'вск') ? '#f5f6fd' : '#fff'}` }}>
                        <p>{elem.quantity}</p>
                    </div>
                ))
                newProjectBody.push(<div className='timeTableRow project'>{newList}</div>);
            })
            user.hoursByDay = hoursByDay;
            let newList = hoursByDay.map((elem) => {
                SumHours.forEach((hour) => {
                    if (hour.date.toLocaleDateString() === elem.date.toLocaleDateString()) {
                        hour.quantity += elem.quantity;
                    }
                })
                return (
                    <div style={{ width: `calc(100% / ${datesArray.length})`, minWidth: "130px", backgroundColor: `${(format(elem.date, 'EE', { locale: ru }) === 'суб') || (format(elem.date, 'EE', { locale: ru }) === 'вск') ? '#f5f6fd' : '#fff'}` }}>
                        <p>{elem.quantity}</p>
                    </div>
                )
            }
            )
            newBody.push(<div className='timeTableRow user'>{newList}</div>);
            newBody.push(newProjectBody)
            return <TimeTableSidebarListElem key={user.id} user={user}
            />;
        });
        console.log(SumHours);
        let newFooter = SumHours.map((elem) => (
            <div style={{ width: `calc(100% / ${datesArray.length})`, minWidth: "130px", backgroundColor: `${(format(elem.date, 'EE', { locale: ru }) === 'суб') || (format(elem.date, 'EE', { locale: ru }) === 'вск') ? '#f5f6fd' : '#fff'}` }}>
                <p>{elem.quantity}</p>
            </div>
        ))
        setFooter(newFooter);
        setBody(newBody);
        let newList = datesArray.map((elem) => (
            <div style={{ width: `calc(100% / ${datesArray.length})`, minWidth: "130px", backgroundColor: `${(format(elem, 'EE', { locale: ru }) === 'суб') || (format(elem, 'EE', { locale: ru }) === 'вск') ? '#f5f6fd' : '#fff'}` }}>
                <h1>{format(elem, 'dd', { locale: ru })}</h1>
                <p>{format(elem, 'EE', { locale: ru })}</p>
            </div>
        ))
        console.log(users);
        setSum(sum);
        setSideRows(list);
        setHeader(newList)
    }, [users]);
    return (
        <div>
            <div className="timeTable">
                <div className='timeTableSidebar'>
                    <div className='timeTableSidebarHeader'>
                        <p>ФИО</p>
                        <p>Часы</p>
                    </div>
                    <div className='timeTableSidebarRows'>
                        {sideRows}
                    </div>
                    <div className='blankSpace'/>
                    <div className='timeTableSidebarFooter'>
                        <p>Всего</p>
                        <p>{Sum}</p>
                    </div>
                </div>
                <div className="timeTableData">
                    <div className='timeTableDataHeader'>{headerList}</div>
                    <div className='timeTableRows'>{body}</div>
                    <div className='blankSpace'/>
                    <div className='timeTableFooter'>{footer}</div>
                </div>
            </div>
        </div>

    )
}