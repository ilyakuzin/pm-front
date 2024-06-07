const addProjectReq = async (
    data: {
        name: string,
        manager: object,
        developers: string,
        designers: string,
        deadline: Date,
        comments: string,
        status: string,
        evaluationOfProject: number,
        cost: number,
        evaluationByHour: number,
        relatedProjects: string,
    },
    accessToken: string
) => {
    console.log(accessToken)
    let ProjectData = await fetch('http://62.173.140.183:5000/api/projects/create', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }),
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
        keepalive: true
    }
    )
    const answer = await ProjectData.json();
    console.log(answer)
    if (ProjectData.ok) {
        return answer;
    } else {
        const errAns = { status: ProjectData.status, message: answer.message }
        return errAns;
    }
}
export default addProjectReq;
