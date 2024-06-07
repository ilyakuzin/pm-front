const getProjectsForDeveloper = async (
    accessToken: string
) => {
    let UserData = await fetch('http://62.173.140.183:5000/api/projects/my', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }),
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
        keepalive: true
    }
    )
    const answer = await UserData.json();
    if (UserData.ok) {
        return answer;
    } else {
        const errAns = { status: UserData.status, message: answer.message }
        return errAns;
    }
}
export default getProjectsForDeveloper;
