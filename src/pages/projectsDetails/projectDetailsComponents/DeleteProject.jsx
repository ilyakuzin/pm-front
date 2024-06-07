import "./deleteProject.scss";
import Fade from 'react-reveal/Fade';
import ButtonDelete from "../../../components/deleteButton/ButtonDelete";

const DeleteProject = ({ open, onClose, name, idProject }) => {
  if (!open) return null;
  
  return (
    <Fade>
      <div onClick={onClose} className="delete-user">
        <div onClick={(e) => e.stopPropagation()} className="delete-user-container">
          <div className='delete-user-container-title'>
            <p>Вы уверены, что хотите удалить проект {name}?</p>
          </div>
          <div className="delete-user-container-buttons">
            <ButtonDelete value="Отменить" disState={true} isProject={false} onClose={onClose} />
            <ButtonDelete value="Удалить" disState={false} isProject={true} onClose={onClose} idProject={idProject}/>
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default DeleteProject;