import "./checkMark.scss";
import { useState, useEffect, useRef } from "react";
import checkMarkProfile from "../../../resources/icons/checkMark.svg";
import DeleteUser from "../profileComponents/DeleteUser";
import EditUser from "../profileComponents/EditUser";

const CheckMark = ({ name, admin, profile }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [addEditProfileModal, setEditProfileModal] = useState(false);
  const [addDeleteModal, setAddDeleteModal] = useState(false);
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
      {admin ?
        <div className="inner-info">
          <span className="text">
            {name}
          </span>
          <img
            className="check"
            src={checkMarkProfile}
            alt=""
            onClick={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
          />
          <ul className={menuIsOpen ? "menu-dropdowns" : "menu-dropdown-hiddens"} ref={menuRef}>
            <li onClick={() => {
              setEditProfileModal(true);
              setMenuIsOpen(!menuIsOpen);
            }}>Редактировать пользователя</li>

            {!profile &&
              <li onClick={() => {
                setAddDeleteModal(true);
                setMenuIsOpen(!menuIsOpen);
              }}>Удалить пользователя</li>
            }

          </ul>
          <EditUser open={addEditProfileModal} onClose={() => setEditProfileModal(false)} />
          <DeleteUser open={addDeleteModal} namePerson={name} onClose={() => setAddDeleteModal(false)} />
        </div>
        :
        <span className="text">
          {name}
        </span>
      }
    </>
  )
}

export default CheckMark;