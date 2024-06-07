import "./people.scss";
import AddPeople from "../../components/people/AddPeople";
import plusPng from '../../resources/icons/plus.png'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserRole } from "../../store/thisUserReducer";
import DeveloperHours from "../../components/people/hours/DeveloperHours";
import GetAllUsers from "../../data/Users/GetAllUser.ts";
import PeopleRow from "../../pages/people/PeopleRow";

const People = () => {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState("");
  const [rows, setRows] = useState();
  const token = useSelector(selectAccessToken);
  const userRole = useSelector(selectUserRole);

  const getAllUser = async () => {
    let data = await GetAllUsers(token);
    setUsers(data);

    let list = await users.map((user) => {
      return <PeopleRow key={user.id} project={user} />;
    });
    await setRows(list);
  };

  useEffect(() => {
    getAllUser();
  }, [users]);

  return (
    <div className="peopleContent">
      <h1>Сотрудники</h1>
      {userRole === 'DEVELOPER' &&
        <DeveloperHours
          token={token}
        />
      }

      {userRole !== 'DEVELOPER' &&
        <div>
          <div onClick={() => setOpenModal(true)} className="link--wrapper">
            <img src={plusPng} alt="" />
            <p>
              Добавить пользователя
            </p>
          </div>
          <AddPeople open={openModal} onClose={() => setOpenModal(false)} />
        </div>
      }

      <div className="peopleContentTable">
        <div className="peopleTable">
          <div className="peopleHeader">
            <p>ФИО</p>
            <p>Должность</p>
            <p>Ставка</p>
            <p>Электронная почта</p>
            <p>Телеграм</p>
            <p>Номер телефона</p>
          </div>
          <div className="peopleRows">{rows}</div>
        </div>
      </div>

    </div>
  )
}

export default People;