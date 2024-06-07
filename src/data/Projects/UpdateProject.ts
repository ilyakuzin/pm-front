const UpdateProject = async (
    data: {
        name: string,
        manager: object,
        developers: string,
        designers: string,
        deadline: Date,
        comments: Array<string>,
        evaluationOfProject: number,
        evaluationByHour: number,
        cost: number,
        status: string,
        relatedProjects: string,
    },
    id: string,
    accessToken: string
) => {
    console.log(accessToken)
    let ProjectData = await fetch(`http://62.173.140.183:5000/api/projects/${id}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }),
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(data),
        credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
        keepalive: true
    }
    )
    const answer = await ProjectData.json();
    if (ProjectData.ok) {
        return answer;
    } else {
        const errAns = { status: ProjectData.status, message: answer.message }
        return errAns;
    }
}
export default UpdateProject;
