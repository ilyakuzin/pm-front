import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import getDataForSalaryTable from '../../data/salaryTable/getDataForSalaryTable.ts';
import { selectAccessToken } from '../../store/thisUserReducer';
import EditAward from './editAwardWindow';
import EditPrepayment from './editPrepaymentWindow';
import EditRate from './editRateWindow';
import EditVacation from './editVacationWindow';
import SalaryRow from './SalaryRow';
import './SalaryTable.scss'
export default function SalaryTable(props) {
    const token = useSelector(selectAccessToken);
    //const [AllProjects, setAllProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState();
    const [Sum, setSum] = useState({ rate: 0, hours: 0, remainder: 0, salary: 0, prepayment: 0, vacation: 0, award: 0, sum: 0 })
    const [rateEditVisability, setRateV] = useState(false);
    const [prepaymentEditVisability, setPrepaymentV] = useState(false);
    const [vacationEditVisability, setVacationV] = useState(false);
    const [awardEditVisability, setAwardV] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const openRateEdit = (user) => {
        setRateV(true);
        setEditUser(user);
    }

    const openPrepaymentEdit = (user) => {
        setPrepaymentV(true);
        setEditUser(user);
    }

    const openVacationEdit = (user) => {
        setVacationV(true);
        setEditUser(user);
    }

    const openAwardEdit = (user) => {
        setAwardV(true);
        setEditUser(user);
    }


    const loadUsers = async () => {
        //console.log(props.date1)
        let data = await getDataForSalaryTable(token, props.date1, props.date2);
        if (data.users) {
            //setAllProjects(data);
            setUsers(data.users);
        } else {
            setUsers([]);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [props.date1, props.date2]);

    useEffect(() => {
        let sum = { rate: 0, hours: 0, remainder: 0, salary: 0, prepayment: 0, vacation: 0, award: 0, sum: 0 };
        if (users.length > 0) {
            let list = users.map((user) => {
                sum.rate = sum.rate + user.rate[0].value;
                sum.hours = sum.hours + user.hours;
                sum.remainder = sum.remainder + user.remainder;
                sum.salary = sum.salary + user.salary;
                sum.prepayment = sum.prepayment + user.prepayment.prepayment;
                sum.vacation = sum.vacation + user.vacation.vacation;
                sum.award = sum.award + user.award.award;
                sum.sum = sum.sum + user.sum;
                return <SalaryRow key={user.id} data={user}
                    editRate={(user) => { openRateEdit(user) }}
                    editVacation={(user) => { openVacationEdit(user) }}
                    editPrepayment={(user) => { openPrepaymentEdit(user) }}
                    editAward={(user) => { openAwardEdit(user) }}
                />;
            });
            setSum(sum);
            setRows(list);
        }
    }, [users]);
    return (
        <div>
            {rateEditVisability ? <EditRate user={editUser} onClose={() => { setRateV(false); loadUsers() }} /> : null}
            {vacationEditVisability ? <EditVacation user={editUser} onClose={() => { setVacationV(false); loadUsers() }} /> : null}
            {prepaymentEditVisability ? <EditPrepayment user={editUser} onClose={() => { setPrepaymentV(false); loadUsers() }} /> : null}
            {awardEditVisability ? <EditAward user={editUser} onClose={() => { setAwardV(false); loadUsers() }} /> : null}
            <div className="salaryTable">
                <div className="salaryHeader">
                    <p>ФИО</p>
                    <p>Ставка/час</p>
                    <p>Потраченные часы</p>
                    <p>Остаток к выдаче</p>
                    <p>Зарплата без премии</p>
                    <p>Аванс</p>
                    <p>Отпускные</p>
                    <p>Премия</p>
                    <p>Всего</p>
                </div>
                <div className="salaryRows">{rows}</div>
                <div className='salaryFooter'>
                    <p>Всего</p>
                    <p>{Sum.rate}</p>
                    <p>{Sum.hours}</p>
                    <p>{Sum.remainder}</p>
                    <p>{Sum.salary}</p>
                    <p>{Sum.prepayment}</p>
                    <p>{Sum.vacation}</p>
                    <p>{Sum.award}</p>
                    <p>{Sum.sum}</p>
                </div>
            </div>
        </div>
    )
}