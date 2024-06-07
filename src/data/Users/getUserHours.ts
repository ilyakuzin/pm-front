import { format } from "date-fns";
import { ru } from "date-fns/locale";

const getUserHours = async (
    accessToken: string,
    date1: Date,
    date2: Date
) => {
    const start = format(date1, 'yyyy-MM-dd', {locale: ru})
    const endPlusOne = new Date()
    endPlusOne.setDate(date2.getDate()+1)
    const end = format(endPlusOne, 'yyyy-MM-dd', {locale: ru})
    let UserData = await fetch(`http://62.173.140.183:5000/api/hours/my?start=${start}&end=${end}`, {
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
        return answer;
    } else {
        const errAns = { status: UserData.status, message: answer.message }
        return errAns;
    }
}
export default getUserHours;
