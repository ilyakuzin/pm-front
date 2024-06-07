import "./projectUsers.scss";
import addBtnPD from "../../../resources/icons/addBtnPD.svg";
import { Link } from 'react-router-dom';
import { useState } from "react";
import AddContributor from "../projectRequests/AddContributor";

const ProjectUsers = ({ manager, developers, designers }) => {
  const host = 'http://62.173.140.183:5000/';
  const [openModal, setOpenModal] = useState(false);

  const developersRow = developers.map(developer => {
    return (
      <Link to={"/people/" + developer._id}>
        <div className="developer">
          {developer.avatar ? <img alt="" key={developer._id} src={host + developer.avatar} title={developer.firstName} /> : <div title={developer.name} className="avatar">{developer.surname[0] + developer.firstName[0]}</div>}
          <div><p>{developer.surname + " " + developer.firstName}</p><p className="post">Разработчик</p></div></div></Link>
    )
  });


  const designersRow = designers.map(designer => {
    return (
      <Link to={"/people/" + designer._id}>
        <div className="developer">
          {designer.avatar ? <img alt="" key={designer._id} src={host + designer.avatar} title={designer.firstName} /> : <div title={designer.name} className="avatar">{designer.surname[0] + designer.firstName[0]}</div>}
          <div><p>{designer.surname + " " + designer.firstName}</p><p className="post">Дизайнер</p></div></div></Link>
    )
  });

  return (
    <>
      <div className="users-container">
        <div className="developersBox">
          <img
            src={addBtnPD}
            alt=""
            onClick={() => setOpenModal(true)}
          />
          <p className="addUserHeader" onClick={() => setOpenModal(true)}>Добавить участника</p>
          {
            manager.user && <Link to={"/people/" + manager.user.id}>
              <div className="developer">
                {manager.user.avatar ? <img alt="" key={manager.user.id} src={host + manager.user.avatar} title={manager.user.firstName} /> : <div title={manager.user.name} className="avatar">{manager.user.surname[0] + manager.user.firstName[0]}</div>}
                <div><p>{manager.user.surname + " " + manager.user.firstName}</p><p className="post">Менеджер</p></div></div></Link>
          }
          {manager.user && developersRow}
          {manager.user && designersRow}
        </div>
      </div >
      <AddContributor open={openModal} onClose={() => setOpenModal(false)} developers={developers} designers={designers} />
    </>

  )
}

export default ProjectUsers;
