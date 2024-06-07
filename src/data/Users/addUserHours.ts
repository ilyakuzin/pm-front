const addUserHours = async (
    data: {
        projectName: string,
        quantity: number,
        date: Date,
        description: string
    },
    accessToken: string
) => {
    let UserData = await fetch('http://62.173.140.183:5000/api/hours/add', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }),
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
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
export default addUserHours;
