import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import getManagersReq from "../../data/Users/getManagersReq.ts";
import filter from '../../resources/icons/filter.svg';
import { selectAccessToken } from "../../store/thisUserReducer";
import './FilterWindow.scss'

const FilterWindow = (props) => {
  const host = 'http://deploy-project-management.herokuapp.com/';
  const token = useSelector(selectAccessToken);
  const [isFilterWindowVisible, showFilterWindow] = useState(false);
  const [managerName, setManager] = useState('');
  const [managersComponents, setComponents] = useState();
  
  const menuRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        showFilterWindow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  const getData = async () => {
    let managers = await getManagersReq(token);
    let newData = managers.map(user => {
      return (

        <div className="Manager" key={user.user.id} id={user.user.id} username={user.user.surname + " " + user.user.firstName} onClick={(e) => {
          console.log(e);
          setManager(e.currentTarget.getAttribute('username'));
          props.setFilter(e.currentTarget.getAttribute('id'));
        }}>
          {user.user.avatar ? <img alt='Аватарка' src={host + user.user.avatar} /> : <div>{user.user.surname[0] + user.user.firstName[0]}</div>}
          <p>{user.user.surname + " " + user.user.firstName}</p>
        </div>
      )
    });
    setComponents(newData);
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='FilterButton' ref={menuRef} onClick={() => { showFilterWindow(!isFilterWindowVisible) }}>
      {managerName !== '' ?
        <p>{managerName}</p> :
        <p>Менеджер</p>}
      <img alt="" src={filter}/>
        <div onBlur={() => { showFilterWindow(false) }} className={isFilterWindowVisible ? "managersList-visible" : "managersList-hidden"}>
          <div className="Manager" onClick={() => { props.setFilter('no-filter'); setManager('') }}>
            <p>No filter</p>
          </div>
          {managersComponents}
        </div>
    </div>
  )
}

export default FilterWindow;