import "./checkMarkPD.scss";
import checkMark from "../../../resources/icons/checkMark.svg";
import { useState, useEffect, useRef } from 'react';
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";

const CheckMarkPD = ({ name, idProject }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [editProjectIsOpen, setEditProjectIsOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <>
      <img
        ref={menuRef}
        className="check"
        src={checkMark}
        alt=""
        onClick={() => {
          setMenuIsOpen(!menuIsOpen);
        }}
      />
      <ul className={menuIsOpen ? "menu-dropdownz" : "menu-dropdown-hiddenz"}>
        <li onClick={() => {
          setEditProjectIsOpen(true);
          setMenuIsOpen(!menuIsOpen);
        }}>Редактировать проект</li>
        <li onClick={() => {
          setDeleteProject(true);
          setMenuIsOpen(!menuIsOpen);
        }}>Удалить проект</li>
      </ul>
      <EditProject open={editProjectIsOpen} onClose={() => setEditProjectIsOpen(false)} />
      <DeleteProject open={deleteProject} onClose={() => setDeleteProject(false)} name={name} idProject={idProject}/>
    </>
  )
}

export default CheckMarkPD;