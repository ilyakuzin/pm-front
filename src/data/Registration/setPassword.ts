const setPasswordReq = async (
    data: {
        password: string,
        passwordVerify: string
    },
    link:string
) => {
    console.log(data)
    let UserData = await fetch(`http://62.173.140.183:5000/api/users/registration/${link}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
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
export default setPasswordReq;
