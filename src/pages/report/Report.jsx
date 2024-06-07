import "./report.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserRole } from "../../store/thisUserReducer";
import DeveloperHours from "../../components/people/hours/DeveloperHours";
import AdminReport from "./Components/adminReport";
import ManagerReport from "./Components/managerReport";

const Report = () => {
    const token = useSelector(selectAccessToken);
    const userRole=useSelector(selectUserRole);

    return (
        <div className="peopleContent">
            <h1>Табель</h1>
            {userRole === 'DEVELOPER' &&
                <DeveloperHours
                    token={token}
                />
            }

            {(userRole === 'ADMIN') &&
                <AdminReport />
            }
            {(userRole === 'MANAGER' ) &&
                <ManagerReport />
            }

        </div>
    )
}

export default Report;