import { Link } from 'react-router-dom';
import './TimeTableSidebarListElem.scss'
const TimeTableSidebarListElem = (props) => {
      const host = 'http://62.173.140.183:5000/';

      let projects = props.user.projectData.map(project => { return (<div className='timeTableProject'><Link to={"/projects/" + project.project._id}><div className='TimeTableCircle'></div>{project.project.name}</Link><p>{project.sum}</p></div>) });


      return (
            <div className="timeTableSidebarRow">
                  <div className='timeTableUser' title={props.user.user.name}>
                        <Link to={"/people/" + props.user.user._id}>{props.user.user.avatar ? <img alt="" className='mPhoto' src={host + props.user.user.avatar} /> : <div className='noAvatar'>{props.user.user.surname[0] + props.user.user.firstName[0]}</div>}<p>{props.user.user.name}</p></Link>
                        <p>{props.user.sum}</p>
                  </div>
                  <div className="projectsFromTimeTable">{projects}</div>
            </div>
      )
}

export default TimeTableSidebarListElem;
