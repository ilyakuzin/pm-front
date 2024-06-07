import { useState, useRef, useEffect } from "react";
import "./plusButton.scss";
import addButtonIcon from "../../../../resources/icons/addButtonIcon.svg";
import AddPeople from "../../../people/AddPeople";
import AddProject from "../../../projects/AddProject";


const Button = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [addPeopleModal, setAddPeopleModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [menuIsOpen]);

  return (
    <div>
      <div className="button" ref={menuRef}>
        <img
          src={addButtonIcon}
          alt=""
          onClick={() => {
            setMenuIsOpen(!menuIsOpen);
          }}
        />

        <ul className={menuIsOpen ? "plus-dropdown" : "plus-dropdown-hidden"} >
          <li onClick={() =>{
            setAddProjectModal(true);
            setMenuIsOpen(!menuIsOpen);
            }}>Проект</li>
          <li onClick={() => {
            setAddPeopleModal(true);
            setMenuIsOpen(!menuIsOpen);
          }}>Пригласить</li>
        </ul>
      </div>
      <AddProject open={addProjectModal} onClose={() => setAddProjectModal(false)} />
      <AddPeople open={addPeopleModal} onClose={() => setAddPeopleModal(false)} />
    </div>
  )
}

export default Button;