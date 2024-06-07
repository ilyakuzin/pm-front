import "./projectDetails.scss";
import GetProjectReq from "../../data/Projects/GetProject.ts";
import GetUserInfo from "../../data/Users/GetUserInfo.ts";
import UpdateProject from "../../data/Projects/UpdateProject.ts";
import { useParams } from "react-router-dom";
import { selectAccessToken } from "../../store/thisUserReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CheckMarkPD from "./projectDetailsComponents/CheckMarkPD";
import ProjectUsers from "./projectDetailsComponents/ProjectUsers";
import RelatedProjects from "./projectDetailsComponents/RelatedProjects";
import getHistory from '../../data/Projects/getHistory.ts';
import calendarIcon from "../../resources/icons/calendarIcon.svg";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const ProjectsDetails = () => {
  const token = useSelector(selectAccessToken);
  const { id } = useParams();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const [evByHour, setEvByHour] = useState('');
  const [evOfProject, setEvOfProject] = useState('');
  const [wastedHours, setWastedHours] = useState('');
  const [costValue, setCostValue] = useState('');
  const [profit, setProfit] = useState('');
  const [manager, setManager] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [comments, setComments] = useState('');
  const [isDetails, setIsDetails] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [historyDataToShow, setHistoryDataToShow] = useState([]);

  const updateProject = async () => {
    const ProjectData = await UpdateProject({
      comments: comments
    }, id, token);
    if (ProjectData.status) {
      window.location.reload();
    }
  }

  const getDataForHistory = async () => {
    let data = await getHistory(id, token)
    console.log(data)
    let rowsArr = []
    setHistoryData(data)
    if (data[0]) {
      rowsArr = data.map((item) => {

        if (item.changedByManager) {

          let changes = []
          let desNew = ''
          let desOld = ''
          let devNew = ''
          let devOld = ''
          let relOld = ''
          let relNew = ''
          let statusOld = ''
          let statusNew = ''
          let manOld = ''
          let manNew = ''

          if (item.designers_actual[0] !== undefined) {
            item.designers_actual.forEach((des, ind) => {
              if (ind !== item.designers_actual.length-1) desNew += (`${des.surname} ${des.firstName}, `)
              else desNew += (`${des.surname} ${des.firstName}`)
            })
          }

          if (item.designers_late[0] !== undefined) {
            item.designers_late.forEach((des, ind) => {
              if (ind !== item.designers_late.length-1) desOld += (`${des.surname} ${des.firstName}, `)
              else desOld += (`${des.surname} ${des.firstName}`)
            })
          }

          if (item.developers_actual[0] !== undefined) {
            item.developers_actual.forEach((des, ind) => {
              if (ind !== item.developers_actual.length-1) devNew += (`${des.surname} ${des.firstName}, `)
              else devNew += (`${des.surname} ${des.firstName}`)
            })
          }

          if (item.developers_late[0] !== undefined) {
            item.developers_late.forEach((des, ind) => {
              if (ind !== item.developers_late.length-1) devOld += (`${des.surname} ${des.firstName}, `)
              else devOld += (`${des.surname} ${des.firstName}`)
            })
          }

          if (item.relatedProjects_actual[0] !== undefined) {
            item.relatedProjects_actual.forEach((des, ind) => {
              if (ind !== item.relatedProjects_actual.length-1) relNew += (`${des.name}, `)
              else relNew += (`${des.name}`)
            })
          }

          if (item.relatedProjects_late[0] !== undefined) {
            item.relatedProjects_late.forEach((des, ind) => {
              if (ind !== item.relatedProjects_late.length-1) relOld += (`${des.name}, `)
              else relOld += (`${des.name}`)
            })
          }

          if (item.status_actual !== undefined && item.status_actual.statusName !== undefined ) {
            statusNew += `${item.status_actual.statusName} ${item.status_actual.emoji}`
          }

          if (item.status_late !== undefined && item.status_late.statusName !== undefined) {
            statusOld += `${item.status_late.statusName} ${item.status_late.emoji}`
          }

          if (item.manager_actual !== undefined && item.manager_actual.firstName !== undefined ) {
            manNew += `${item.manager_actual.surname} ${item.manager_actual.firstName}`
          }

          if (item.manager_late !== undefined && item.manager_late.firstName !== undefined) {
            manOld += `${item.manager_late.surname} ${item.manager_late.firstName}`
          }

          if (desNew !== desOld) {
            changes.push (
              <div className="history_row_change">
                <p>{`Дизайнеры: ${desOld} -> ${desNew}`}</p>
              </div>
            )
          }

          if (devNew !== devOld) {
            changes.push (
              <div className="history_row_change">
                <p>{`Разработчики: ${devOld} -> ${devNew}`}</p>
              </div>
            )
          }

          if (relNew !== relOld) {
            changes.push (
              <div className="history_row_change">
                <p>{`Связанные проекты: ${relOld} -> ${relNew}`}</p>
              </div>
            )
          }

          if (statusNew !== statusOld) {
            changes.push (
              <div className="history_row_change">
                <p>{`Статус: ${statusOld} -> ${statusNew}`}</p>
              </div>
            )
          }

          if (manNew !== manOld) {
            changes.push (
              <div className="history_row_change">
                <p>{`Менеджер: ${manOld} -> ${manNew}`}</p>
              </div>
            )
          }

          const valuesNamesAct = Object.keys(item.actual)
          const valuesNamesLate = Object.keys(item.late)

          valuesNamesAct.forEach((name) => {
            if (item.actual[name] !== item.late[name] && (item.actual[name].length !== 0 || item.late[name].length !== 0)) {
              if (name === 'cost') {
                changes.push(
                  <div className="history_row_change">
                    <p>{`Стоимость: ${item.late[name]} -> ${item.actual[name]}`}</p>
                  </div>
                )
              } else if (name === 'deadline') {
                changes.push(
                  <div className="history_row_change">
                    <p>{`Дедлайн: ${format(new Date(item.late[name]), 'PP', { locale: ru })} -> ${format(new Date(item.actual[name]), 'PP', { locale: ru })}`}</p>
                  </div>
                )
              } else if (name === 'evaluationByHour') {
                changes.push(
                  <div className="history_row_change">
                    <p>{`Оценка за час: ${item.late[name]} -> ${item.actual[name]}`}</p>
                  </div>
                )
              } else if (name === 'evaluationOfProject') {
                changes.push(
                  <div className="history_row_change">
                    <p>{`Оценка за проект: ${item.late[name]} -> ${item.actual[name]}`}</p>
                  </div>
                )
              } else if (name === 'name') {
                changes.push(
                  <div className="history_row_change">
                    <p>{`Название: ${item.late[name]} -> ${item.actual[name]}`}</p>
                  </div>
                )
              } else if (name === 'percentageDifference') {
                changes.push(
                  <div className="history_row_change">
                    <p>{`Разница в процентах: ${item.late[name]} -> ${item.actual[name]}`}</p>
                  </div>
                )
              }
            }
          })
          if (changes.length !== 0) return (<div >
            <div className="dfjs">
              <div className="history_row_managerName">
                <p>{item.changedByManager.surname}</p>
                <p>{item.changedByManager.firstName}</p>
              </div>
              <div className="history_row_date">
                <p>{format(new Date(item.dateOfChange), 'PP', { locale: ru })}</p>
                <p>в</p>
                <p>{format(new Date(item.dateOfChange), 'hh:mm', { locale: ru })}</p>
              </div>
            </div>
            <div className="history_row_changes">
              {changes}
            </div>
          </div>)
          else return (<></>)
        }
      })
    }
    setHistoryDataToShow(rowsArr)
  }

  const getManagerInfo = async (id) => {
    let data = await GetUserInfo(token, id);
    setManager(data);
  }

  const getProjectInfo = async (id) => {
    let data = await GetProjectReq(id);
    console.log(data);
    const getTime = (data) => {
      let date = new Date(data.deadline);
      if (!isNaN(date)) {
        return String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
      } else {
        return "Заполните поле";
      }
    }
    getManagerInfo(data.manager);
    setName(data.name);
    setStatus(data.status.statusName + " " + data.status.emoji);
    setDeadline(getTime(data));
    setEvByHour(data.evaluationByHour);
    setEvOfProject(data.evaluationOfProject);
    setWastedHours(data.wastedHours);
    setCostValue(data.cost);
    setProfit(data.profit);
    setDesigners(data.designers);
    setDevelopers(data.developers);
    setRelatedProjects(data.relatedProjects);
    if (data.comments.length !== 0) {
      setComments(data.comments[data.comments.length - 1].comment);
    }
  }

  useEffect(() => {
    getProjectInfo(id);
  }, [id]);

  const getPercents = (hours) => {
    return hours ?
      wastedHours + ` (${Math.floor((wastedHours / evOfProject) * 100)})%`
      : "0%";
  }

  return (

    <>
      {name &&
        <div className="container">
          <div className="upperContainer">
            <h1 className="nameOfProject">{name}</h1>
            <CheckMarkPD name={name} idProject={id} />
            <h3 className="projectStatus">{status}</h3>
          </div>
          <div>

            <div className="projectdetails_header">
              <h4 className="headerInfo mgtop0">{isDetails ? 'Общая информация' : 'История'}</h4>
              <div className="adminReportSliderWithHeaders">
                <p>Детали</p>
                <div className='slider unactive'
                  onClick={(e) => {
                    if (!isDetails) {
                      e.currentTarget.className = 'slider unactive';
                    } else {
                      e.currentTarget.className = 'slider active';
                      getDataForHistory()
                    }
                    setIsDetails((value) => !value);
                  }}
                >
                  <div className="sliderCircle" />
                </div>
                <p>История</p>
              </div>
            </div>
            {isDetails ?

              (<div className="containerInfo">
                <div className="projectsTable">
                  <div className="projectsHeader">
                    <div className="projectsDate">
                      <p>Срок</p>
                      <img src={calendarIcon} alt="" />
                    </div>

                    <p>Оценка/час</p>
                    <p>{"Оценка(часы)"}</p>
                    <p>Потр. часы</p>
                    <p>Стоимость</p>
                    <p>Прибыль</p>
                  </div>
                  <hr />
                  <div className="projectsHeader">
                    <p>{deadline}</p>
                    <p>{evByHour}</p>
                    <p>{evOfProject}</p>
                    <p>{getPercents(wastedHours)}</p>
                    <p>{costValue ? costValue : evByHour * evOfProject}</p>
                    <p>{profit}</p>
                  </div>
                </div>
              </div>
              )
              :
              <div className="history_data">
                {historyData &&
                  historyDataToShow
                }
              </div>
            }
            {isDetails &&
              (
                <div>
                  <h4 className="headerInfo">Участники проекта</h4>
                  <div className="users">
                    {name && <ProjectUsers manager={manager} developers={developers} designers={designers} />}
                  </div>
                  <h4 className="headerInfo">Связанные проекты</h4>
                  <div className="users">
                    {relatedProjects && <RelatedProjects projectData={relatedProjects} />}
                  </div>
                  <h4 className="headerInfo">Комментарии</h4>
                  <div className="modalInputComments">
                    <button
                      className="comment-button"
                      onClick={() => updateProject()}
                    >Комментировать</button>
                    <textarea
                      onChange={(e) => setComments(e.target.value)}
                      value={comments}
                      type={'text'}
                      placeholder={'Введите текст'}
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      }
    </>
  )
}

export default ProjectsDetails;