import "./relatedProjects.scss";
import addBtnPD from "../../../resources/icons/addBtnPD.svg";
import { Link } from 'react-router-dom';

const RelatedProjects = ({ projectData }) => {
  let projectsRow;

  if (projectData) {
    projectsRow = projectData.map(project => {
      return (
        <Link to={"/project/" + project.id}>
          <div className="project-user">
            <div title={project.name} className="project-avatar"></div>
            <div><p className="post">{project.name}</p></div></div></Link>
      )
    });
  }

  return (
    <>
      <div className="users-container">
        <img
          src={addBtnPD}
          alt=""
        />
        <p>Добавить проект</p>
        <div className="developersBox">
          {projectData.relatedProjects && projectsRow}
        </div>
      </div >
    </>
  )
}

export default RelatedProjects;