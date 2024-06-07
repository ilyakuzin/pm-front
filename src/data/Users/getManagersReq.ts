const getManagersReq = async (
    accessToken: string
) => {
    let UserData = await fetch('http://62.173.140.183:5000/api/users/?role=MANAGER', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }),
        mode: 'cors',
        method: 'GET',
        credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
        keepalive: true
    }
    )
    const answer = await UserData.json();
    if (UserData.ok) {
        answer.map(manager => {
            manager.user.name = (manager.user.surname?(manager.user.surname+ ' ' ):'') + (manager.user.firstName?(manager.user.firstName):'');
        });
        return answer;
    } else {
        const errAns = { status: UserData.status, message: answer.message }
        return errAns;
    }
}
export default getManagersReq;

/*const url= "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";

export default class managersData{
    managers:Array<
    {
        id:string,
        name:string,
        Img:string
    }>;
    constructor(){
        this.getManagers();
    }
    getManagers(){
        this.managers=[
            {
                id:'124',
                name:'Менеджер 2',
                Img:url
            },
            {
                id:'123',
                name:'Менеджер 1',
                Img:url
            },
            {
                id:'125',
                name:'Менеджер 3',
                Img:url
            }
        ]
    }
}*/
