import './UserPageProjects.scss'

const ProjectsRow = (props) => {
  let designers = props.project.designers.map(user => { return (user.avatar ? <img alt="" key={user.id} src={host + user.avatar} title={user.name} /> : <div title={user.name} className='noAvatar-user-page'><div>{user.surname[0] + user.firstName[0]}</div></div>) });
  let developers = props.project.developers.map(user => { return (user.avatar ? <img alt="" key={user.id} src={host + user.avatar} title={user.name} /> : <div title={user.name} className='noAvatar-user-page'><div>{user.surname[0] + user.firstName[0]}</div></div>) });
  const host = 'http://62.173.140.183:5000/';

  const getTime = (data) => {
    let date = new Date(data);
    if (!isNaN(date)) {
      return String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
    } else {
      return "Нет данных";
    }
  }

  return (
    <div className="projectsRowProfile">
      <p>{props.project.name}</p>
      <div className='noAvatar-user-page'>
        <div title={props.project.manager.name}>
          {props.project.manager.surname[0] + props.project.manager.firstName[0]}
        </div>
      </div>

      <div className='projectStatusProfile'>
        <p style={{ color: props.project.status.color }}><span className='statusEmojiProfile'>{props.project.status.emoji}</span></p>
      </div>
      <p>{getTime(props.project.deadline)}</p>
      <div className="usersBoxProfile">{designers}</div>
      <div className="usersBoxProfile">{developers}</div>
    </div>
  )
}

export default ProjectsRow;
