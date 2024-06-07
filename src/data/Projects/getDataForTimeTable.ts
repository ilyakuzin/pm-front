import { format } from "date-fns";
import { ru } from "date-fns/locale";

const getDataForTimeTable = async (
    accessToken: string,
    date1: Date,
    date2: Date
) => {
    const start = format(date1, 'yyyy-MM-dd', { locale: ru })
    const end = format(date2, 'yyyy-MM-dd', { locale: ru })
    let UserData = await fetch(`http://62.173.140.183:5000/api/hours?start=${start}&end=${end}`, {
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
        answer.hoursData.map(user => {
            let userSum =0;
            user.projectData.map(project=>{
                let projectSum = 0;
                project.hours.map((hour=>{projectSum+=hour.quantity}));
                project.sum=projectSum;
                userSum+=projectSum;
            })
            user.sum=userSum;
            user.user.name = (user.user.surname?(user.user.surname+ ' ' ):'') + (user.user.firstName?(user.user.firstName):'');
        });
        return answer;
    } else {
        const errAns = { status: UserData.status, message: answer.message }
        return errAns;
    }
}
export default getDataForTimeTable;
