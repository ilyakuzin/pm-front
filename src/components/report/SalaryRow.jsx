import edit from '../../resources/icons/edit.svg';
import './SalaryRow.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const SalaryRow = (props) => {
    const host = 'http://62.173.140.183:5000/';
    const hoverFunc = (e) => {
        e.currentTarget.lastChild.style.visibility = 'visible';
        //e.currentTarget.lastChild.style.position = 'static'
    }
    const unhoverFunc = (e) => {
        e.currentTarget.lastChild.style.visibility = 'hidden';
        //e.currentTarget.lastChild.style.position = 'absolute';
    }
    return (
        <div className="salaryRow">
            <div title={props.data.user.name} className='salaryUserBox'><Link to={"/people/" + props.data.user._id}>{props.data.user.avatar ? <img alt="" className='mPhoto' src={host + props.data.user.avatar} /> : <div className='noAvatar'>{props.data.user.surname[0] + props.data.user.firstName[0]}</div>}<p>{props.data.user.surname + ' ' + props.data.user.firstName}</p></Link></div>
            <p
                onClick={() => { props.editRate(props.data) }}
                onPointerEnter={(e) => { hoverFunc(e); }}
                onPointerLeave={(e) => { unhoverFunc(e) }}
            >{props.data.rate[0].value} <img className='editImg' style={{ visibility: 'hidden' }} src={edit} /></p>
            <p>{props.data.hours}</p>
            <p>{props.data.remainder}</p>
            <p>{props.data.salary}</p>
            <p
                onClick={() => { props.editPrepayment(props.data) }}
                onPointerEnter={(e) => { hoverFunc(e); }}
                onPointerLeave={(e) => { unhoverFunc(e) }}
            >{props.data.prepayment.prepayment} <img className='editImg' style={{ visibility: 'hidden' }} src={edit} /></p>
            <p
                onClick={() => { props.editVacation(props.data) }}
                onPointerEnter={(e) => { hoverFunc(e); }}
                onPointerLeave={(e) => { unhoverFunc(e) }}
            >{props.data.vacation.vacation} <img className='editImg' style={{ visibility: 'hidden' }} src={edit} /></p>
            <p
                onClick={() => { props.editAward(props.data) }}
                onPointerEnter={(e) => { hoverFunc(e); }}
                onPointerLeave={(e) => { unhoverFunc(e) }}
            >{props.data.award.award} <img className='editImg' style={{ visibility: 'hidden'}} src={edit} /></p>
            <p>{props.data.sum}</p>
        </div>
    )
}

export default SalaryRow;
