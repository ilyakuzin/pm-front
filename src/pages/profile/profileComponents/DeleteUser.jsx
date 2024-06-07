import "./deleteUser.scss";
import Fade from 'react-reveal/Fade';
import ButtonDelete from "../../../components/deleteButton/ButtonDelete";

const DeleteUser = ({open, onClose, namePerson}) => {
  const lastIndex = namePerson.lastIndexOf(" ");
  namePerson = namePerson.substring(0, lastIndex);

  if (!open) return null;

  return (
    <Fade>
      <div onClick={onClose} className="delete-user">
        <div onClick={(e) => e.stopPropagation()} className="delete-user-container">
          <div className='delete-user-container-title'>
            <p>Вы уверены, что хотите удалить пользователя {namePerson}?</p>
          </div>
          <div className="delete-user-container-buttons">
            <ButtonDelete value="Отменить" disState={true} onClose={onClose}/>
            <ButtonDelete value="Удалить" disState={false} onClose={onClose}/>
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default DeleteUser;