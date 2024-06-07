import "./projects.scss";
import plusPng from "../../resources/icons/plus.png";
import sort from '../../resources/icons/sort.svg';
import { useEffect, useState } from "react";
import AddProject from "../../components/projects/AddProject";
import ProjectsRow from "../../components/projects/ProjectsRow";
import FilterWindow from "../../components/projects/FilterWindow";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../store/thisUserReducer";
import getProjects from "../../data/Projects/GetAllProjects.ts";
import StatusFilter from "../../components/projects/StatusFilter";

const Projects = () => {
  const token = useSelector(selectAccessToken);
  const [openModal, setOpenModal] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rows, setRows] = useState();
  const [managerFilter, setManagerFilter] = useState('no-filter');
  const [statusFilter, setStatusFilter] = useState('no-filter');
  const [deadlineSort, setSort] = useState();

  const handleManagerFilter = (id) => {
    setManagerFilter(id);
  };

  const handleStatusFilter = (emoji) => {
    setStatusFilter(emoji);
  }

  const handleDeadlineSort = () => {
    if( new Boolean(deadlineSort)){
      setSort(!deadlineSort);
    }else{
      setSort(true);
    }
  }

  const loadProjects = async () => {
    let data = await getProjects(token);
    if (data[0]) {
      setAllProjects(data);
      setProjects(data);
    }
  };

  useEffect(() => {
    let filtredProjects = JSON.parse(JSON.stringify(AllProjects));

    if (managerFilter !== 'no-filter') {
      filtredProjects = filtredProjects.filter(function (proj) {
        if (proj.manager) {
          return proj.manager._id === managerFilter;
        } else {
          return false;
        }
      });
    }

    if (statusFilter !== 'no-filter') {
      filtredProjects = filtredProjects.filter(function (proj) {
        return proj.status._id === statusFilter;
      });
    }

    if (deadlineSort == true) {
      filtredProjects.sort((a, b) => {
        return a.deadlineDate - b.deadlineDate
      });
    }
    if (deadlineSort == false) {
      filtredProjects.sort((a, b) => {
        return b.deadlineDate - a.deadlineDate
      });
    }
    console.log(AllProjects);
    setProjects(filtredProjects);
  }, [managerFilter, statusFilter, deadlineSort]);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    let list = projects.map((project) => {
      return <ProjectsRow key={project.id} project={project} />;
    });
    setRows(list);
  }, [projects]);

  return (
    <div className="projectsContent">
      <h1>Проекты</h1>
      <div onClick={() => setOpenModal(true)} className="link--wrapper">
        <img src={plusPng} alt="" />
        <p>Создать новый проект</p>
      </div>
      <div className="projectsTable">
        <div className="projectsHeader">
          <p>Название</p>
          <FilterWindow setFilter={handleManagerFilter} />
          <StatusFilter setFilter={handleStatusFilter} />
          <p onClick={() => { handleDeadlineSort() }} style={{ cursor: "pointer" }}>Срок <img alt="" src={sort} /></p>
          <p>{"Оценка за час(руб.)"}</p>
          <p>{"Оценка проекта(ч.)"}</p>
          <p>Потрач. часы</p>
          <p>Дизайнер</p>
          <p>Разработчик</p>
        </div>
        <div className="projectsRows">{rows}</div>
      </div>
      <AddProject open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Projects;