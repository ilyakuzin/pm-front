import "../../pages/profile/profile.scss";
import UserPageProjects from "../../components/projects/UserPageProjects";
import CheckMark from "../../pages/profile/profileComponents/CheckMark";
import moneyIcon from "../../resources/icons/moneyIcon.svg";
import tagIcon from "../../resources/icons/tagIcon.svg";
import messageIcon from "../../resources/icons/messageIcon.svg";
import telegramIcon from "../../resources/icons/telegramIcon.svg";
import telephoneIcon from "../../resources/icons/telephoneIcon.svg";
import ProfileAvatar from "../../pages/profile/profileComponents/ProfileAvatar";
import GetProjectsForDeveloper from "../../data/Projects/GetProjectsForDeveloper.ts";
import GetUserInfo from "../../data/Users/GetUserInfo.ts";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../../store/thisUserReducer";
import { useParams } from "react-router-dom";
import GetAllProjects from "../../data/Projects/GetAllProjects.ts";

const UserProfile = ({ userData }) => {
  const token = useSelector(selectAccessToken);
  const { id } = useParams();

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [access, setAccess] = useState('')

  const [projects, setProjects] = useState([]);
  const [rows, setRows] = useState();

  const getProjectsForMe = async () => {
    let newProjects = await GetProjectsForDeveloper(token);
    setProjects(newProjects);
  }

  const getAllProject = async () => {
    let data = await GetAllProjects(token);
    let currentDeveloper = await GetUserInfo(token, id);
    let newArray = [];
    data.map(project => {
      project.developers.map(developer => {
        if (developer._id === currentDeveloper.user.id) {
          newArray.push(project)
        } 
      })
    });
    setProjects(newArray);
  }

  const getUserInfo = async () => {
    let data = await GetUserInfo(token, id);
    setName(data.user.surname + " " + data.user.firstName + " " + data.user.secondName);
    roleHandler(data.user.roles[0]);
    setEmail(data.user.email);
    setTelegram(data.user.tgLogin);
    setPhoneNumber(data.user.phone);
    if (typeof (data.rate) === "string") {
      setSalary("Зарплата не указана")
    } else {
      setSalary(data.rate + " руб / час");
    }
    setAccess(userData.user.roles[0]);
    return data;
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
    getUserInfo();
    getProjectsForMe();
    getAllProject();
  }, [id, userData])

  useEffect(() => {
    setRows(projects.map(project => { return (<UserPageProjects key={project.id} project={project} />) }))
  }, [projects]);

  return (
    <div className="profile-content">
      {
        name &&
        <div className="profile-container">
          {name && <ProfileAvatar name={name} />}
          <CheckMark name={name} admin={access === "ADMIN"} />
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
            {(position === "Разработчик" || position === "Менеджер") &&
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
                <p>{"+" + phoneNumber}</p>
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

export default UserProfile;