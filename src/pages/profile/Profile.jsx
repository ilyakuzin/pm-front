import "./profile.scss";
import UserPageProjects from "../../components/projects/UserPageProjects";
import CheckMark from "./profileComponents/CheckMark";
import moneyIcon from "../../resources/icons/moneyIcon.svg";
import tagIcon from "../../resources/icons/tagIcon.svg";
import messageIcon from "../../resources/icons/messageIcon.svg";
import telegramIcon from "../../resources/icons/telegramIcon.svg";
import telephoneIcon from "../../resources/icons/telephoneIcon.svg";
import ProfileAvatar from "./profileComponents/ProfileAvatar";
import GetProjectsForDeveloper from "../../data/Projects/GetProjectsForDeveloper.ts";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../../store/thisUserReducer";

const Profile = ({ setChoosenPage, userData }) => {
  const token = useSelector(selectAccessToken);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [projects, setProjects] = useState([]);
  const [rows, setRows] = useState();

  setChoosenPage("/profile")

  const getProjectsForMe = async () => {
    let newProjects = await GetProjectsForDeveloper(token);
    setProjects(newProjects);
  }

  const roleHandler = (pos) => {
    switch (pos) {
      case "ADMIN":
        setPosition("Администратор");
        break;
      case "DEVELOPER":
        setPosition("Разработчик");
        break;
      case "DESIGNER":
        setPosition("Дизайнер");
        break;
      case "MANAGER":
        setPosition("Менеджер");
        break;
      default:
        setPosition("Нет данных");
        break;
    }
  }

  useEffect(() => {
    setName(userData.user.surname + " " + userData.user.firstName + " " + userData.user.secondName);
    roleHandler(userData.user.roles[0]);
    if (userData.user.roles[0] !== "ADMIN" || userData.user.roles[0] !== "DESIGNER") {
      if (typeof (userData.rate) === "string") {
        setSalary("Зарплата не указана")
      } else {
        setSalary(userData.rate + " руб / час");
      };
    }
    setEmail(userData.user.email);
    setTelegram(userData.user.tgLogin);
    setPhoneNumber(userData.user.phone);
  }, [])

  useEffect(() => {
    getProjectsForMe();
  }, [])

  useEffect(() => {
    setRows(projects.map(project => { return (<UserPageProjects key={project.id} project={project} />) }))
  }, [projects]);

  return (
    <div className="profile-content">
      {
        name &&
        <div className="profile-container">
          {name && <ProfileAvatar name={name} />}
          <CheckMark name={name} admin={position === "Администратор"} profile={true} />
        </div>
      }

      <p className="projects-header">{position === "Разработчик" && "Работает над проектами"}</p>
      <div className="wrapper">
        {
          name &&
          <div className="information-container">
            Информация
            <div className="info">
              <img alt="" src={tagIcon} />
              <p>{position}</p>
            </div>
            {(position === "Менеджер") &&
              <div className="info">
                <img alt="" src={moneyIcon} />
                <p>{salary}</p>
              </div>
            }
            <div className="contacts-container">
              Контакты
              <div className="info">
                <img alt="" src={messageIcon} />
                <p>{email}</p>
              </div>
              <div className="info">
                <img alt="" src={telegramIcon} />
                <p>{telegram}</p>
              </div>
              <div className="info">
                <img alt="" src={telephoneIcon} />
                <p>{phoneNumber}</p>
              </div>
            </div>
          </div>
        }


        {position === "Разработчик" &&
          <div className="projects-container">
            <div className="container-header">
              <p>Название</p>
              <p>Менеджер</p>
              <p>Статус</p>
              <p>Срок</p>
              <p>Дизайнер</p>
              <p>Разработчик</p>
            </div>
            <div className="projects-rows-profile">
              {rows}
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile;