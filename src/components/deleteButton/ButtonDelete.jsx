import "./buttonDelete.scss";
import DeleteProjectReq from "../../data/Projects/DeleteProject.ts";
import { selectAccessToken } from "../../store/thisUserReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ButtonDelete = ({ disState, value, onClose, isProject, idProject }) => {
  const token = useSelector(selectAccessToken);
  const navigate = useNavigate();

  const DeleteProject = async (id, accessToken) => {
    await DeleteProjectReq(id, accessToken);
  }

  return (
    <div className={disState ? "delete-button-disabled" : "delete-button-enabled"}>
      <button onClick={() => {
        if (isProject && !disState) {
          DeleteProject(idProject, token)
            .then(() => {
              if (window.location.pathname === "/projects") {
                window.location.reload();
              } else {
                navigate("/projects");
              }
            })
        } else if (!isProject && !disState) {
          // console.log("user deleted");
        }
        onClose();
      }}>{value}</button>
    </div>
  )
}

export default ButtonDelete;