import './peopleRow.scss';
import { Link } from 'react-router-dom';

const ProjectsRow = (props) => {
      const host = 'http://62.173.140.183:5000/';

      const roleHandler = (pos) => {
            switch (pos) {
                  case "ADMIN":
                        return "Администратор";
                  case "DEVELOPER":
                        return "Разработчик";
                  case "DESIGNER":
                        return "Дизайнер";
                  case "MANAGER":
                        return "Менеджер";
                  default:
                        return "Нет данных";
            }
      }

      const isString = (str) => {
            return typeof(str) === "string" ? true : false;
      }

      return (
            <div className="peopleRow">
                  <div title={props.project.user.name} className="peopleContainer">
                        <Link to={"/people/" + props.project.user.id}>
                              {props.project.user.avatar ?
                                    <img alt="" className='mPhoto' src={host + props.project.user.avatar} />
                                    : <div className='noAvatar'>{props.project.user.surname[0] + props.project.user.firstName[0]}</div>
                              }
                        </Link>
                        <p><Link to={"/people/" + props.project.user.id}>{props.project.user.surname + " " + props.project.user.firstName}</Link></p>
                  </div>
                  <p>{roleHandler(props.project.user.roles[0])}</p>
                  <p>{isString(props.project.rate) ? "Зарплата не указана" : props.project.rate + " руб / час"}</p>
                  <p>{props.project.user.email}</p>
                  <p>{props.project.user.tgLogin}</p>
                  <p>{"+" + props.project.user.phone}</p>
            </div>
      )
}

export default ProjectsRow;
