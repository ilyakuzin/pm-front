import "./addContributor.scss";
import closeBtn from "../../../resources/icons/CloseBtn.png";
import Fade from "react-reveal";
import Selection from "../../../components/people/selection/Selection"
import GetAllUser from "../../../data/Users/GetAllUser.ts";
import UpdateProject from "../../../data/Projects/UpdateProject.ts";
import { selectAccessToken } from "../../../store/thisUserReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AddContributor = ({ open, onClose, designers, developers }) => {
  const host = 'http://deploy-project-management.herokuapp.com/';
  const { id } = useParams();
  const token = useSelector(selectAccessToken);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getAllUser();
  }, [])

  const addUser = (currentUser) => {
    let newArray = [...developers, ...designers];
    console.log(currentUser);
    if (!newArray.find(user => {
      return user._id === currentUser.id;
    })) {
      if (user.roles[0] === "DESIGNER") {
        updateProjectDesigner(user.id);
      } else {
        updateProjectDeveloper(user.id);
      }
    }
  }

  const updateProjectDesigner = async (data) => {
    const ProjectData = await UpdateProject({
      designers: [...designers, data],
    }, id, token);
    if (ProjectData.status) {
      onClose();
      window.location.reload();
    }
  }

  const updateProjectDeveloper = async (data) => {
    const ProjectData = await UpdateProject({
      developers: [...developers, data],
    }, id, token);
    if (ProjectData.status) {
      onClose();
      window.location.reload();
    }
  }

  const selectionUsersHandler = (e) => {
    setUser(e.value);
  }

  const getAllUser = async () => {
    let newUser;
    let data = await GetAllUser(token);
    data.map(user => {
      if ((user.user.roles[0] === "DESIGNER" || user.user.roles[0] === "DEVELOPER")) {
        newUser = {
          value: user.user,
          label: <div className="manager-name"><img alt="" src={host + user.user.avatar} height="8%" width="8%" />{user.user.surname + " " + user.user.firstName}</div>,
        }
        users.push(newUser);
      }
    })
  }

  if (!open) return null;

  return (
    <Fade>
      <div onClick={() => {
        onClose();
      }} className="add-contributor">
        <div onClick={(e) => e.stopPropagation()} className="add-contributor-container">
          <div className='add-contributor-container_title'>
            <h1>Добавить участника</h1>
            <a className='add-contributor-container_link' onClick={() => onClose()}><img alt="" className='add-contributor-container_image' src={closeBtn}></img></a>
          </div>
          <div className="text-field">
            <p>Имя пользователя</p>
            <Selection
              classNamePrefix={'select-with-search'}
              placeholder={'Пользователь'}
              value={users.find(obj => obj.value === user)}
              onChange={selectionUsersHandler}
              options={users}
            />
          </div>
          <div className={user ? 'modal-button-wrapper' : 'modal-button-wrapper_disabled'}>
            <button
              className={user ? 'modal-button' : 'modal-button modal-button-disabled'}
              onClick={() => {
                onClose();
                addUser(user);
              }}
              disabled={!user}
            >Добавить</button>
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default AddContributor;