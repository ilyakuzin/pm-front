import more from '../../resources/icons/more.svg';
import './ProjectsRow.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import EditProject from "../../pages/projectsDetails/projectDetailsComponents/EditProject";
import DeleteProject from "../../pages/projectsDetails/projectDetailsComponents/DeleteProject";

const ProjectsRow = (props) => {
      const [isMenuVisible, setVisibility] = useState(false);
      const [editProjectIsOpen, setEditProjectIsOpen] = useState(false);
      const [deleteProject, setDeleteProject] = useState(false);
      const host = 'http://62.173.140.183:5000/';
      let designers = props.project.designers.map(user => { return (<Link to={"/people/" + user._id}>{user.avatar ? <img alt="" key={user.id} src={host + user.avatar} title={user.name} /> : <div title={user.name}>{user.surname[0] + user.firstName[0]}</div>}</Link>) });
      let developers = props.project.developers.map(user => { return (<Link to={"/people/" + user._id}>{user.avatar ? <img alt="" key={user.id} src={host + user.avatar} title={user.name} /> : <div title={user.name}>{user.surname[0] + user.firstName[0]}</div>}</Link>) });
      developers = developers.slice(0, 3);
      designers = designers.slice(0, 3);
      const menuRef = useRef();

      useEffect(() => {
            let handler = (event) => {
                  if (!menuRef.current.contains(event.target)) {
                        setVisibility(false);
                  }
            };
            document.addEventListener("mousedown", handler);
            return () => {
                  document.removeEventListener("mousedown", handler);
            }
      });

      return (
            <div className="projectsRow">
                  <p><Link to={"/projects/" + props.project.id}>{props.project.name}</Link></p>
                  {props.project.manager ?
                        <div title={props.project.manager.name}><Link to={"/people/" + props.project.manager._id}>{props.project.manager.avatar ? <img alt="" className='mPhoto' src={host + props.project.manager.avatar} /> : <div className='noAvatar'>{props.project.manager.surname[0] + props.project.manager.firstName[0]}</div>}</Link></div>
                        : <p>Нет менеджера</p>}
                  <div className='projectStatus'>
                        <p style={{ color: props.project.status.color }} title={props.project.status.statusName}><span className='statusEmoji'>{props.project.status.emoji}</span></p>

                  </div>
                  <p>{props.project.deadline}</p>
                  <p>{props.project.evaluationByHour}</p>
                  <p>{props.project.evaluationOfProject}</p>
                  <p>{props.project.wastedHours}</p>
                  <div className="usersBox">{designers}</div>
                  <div className="usersBox">{developers}</div>
                  <img src={more} ref={menuRef} alt='More' style={{ width: 20 }} onClick={() => setVisibility(!isMenuVisible)} />
                  <div>
                        <div className={isMenuVisible ? 'projectMoreMenu-visible' : "projectMoreMenu-hidden"}>
                              <p onClick={() => {
                                    setEditProjectIsOpen(true);
                                    setVisibility(!isMenuVisible);
                              }}>Редактировать проект</p>
                              <p onClick={() => {
                                    setDeleteProject(true);
                                    setVisibility(!isMenuVisible);
                              }}>Удалить проект</p>
                        </div>
                        <EditProject open={editProjectIsOpen} onClose={() => setEditProjectIsOpen(false)} idProject={props.project.id} />
                        <DeleteProject open={deleteProject} onClose={() => setDeleteProject(false)} name={props.project.name} idProject={props.project.id} />
                  </div>
            </div>
      )
}

export default ProjectsRow;
