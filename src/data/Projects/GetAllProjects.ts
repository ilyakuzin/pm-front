import { maxTime } from "date-fns";

const getProjects = async (
    accessToken: string
) => {
    const data = await fetch("http://62.173.140.183:5000/api/projects/", {
        headers: {
            authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
        },
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
    const answer = await data.json();
    if (data.ok) {
        answer.map(project => {
            if (project.deadline) {
                let date = new Date(project.deadline);
                project.deadlineDate = date.valueOf();
                project.deadline = date.toLocaleDateString();
            } else {
                let date = new Date(maxTime);
                project.deadlineDate = date.valueOf();
            }
            if (project.manager) {
                project.manager.name = (project.manager.surname ? (project.manager.surname + ' ') : '') + (project.manager.firstName ? (project.manager.firstName + ' ') : '') + (project.manager.secondName ? project.manager.secondName : '');
            }
            project.developers.map(user => { user.name = (user.surname ? (user.surname + ' ') : '') + (user.firstName ? (user.firstName + ' ') : '') + (user.secondName ? user.secondName : ''); });
            project.designers.map(user => { user.name = (user.surname ? (user.surname + ' ') : '') + (user.firstName ? (user.firstName + ' ') : '') + (user.secondName ? user.secondName : ''); });
        });
        return answer;
    } else {
        const errAns = { status: data.status, message: answer.message }
        return errAns;
    }
}

export default getProjects;
