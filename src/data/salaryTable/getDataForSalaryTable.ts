import { format } from "date-fns";
import { ru } from "date-fns/locale";

const getDataForSalaryTable = async (
    accessToken: string,
    date1: Date,
    date2: Date
) => {
    console.log(date1);
    const start = format(date1, 'yyyy-MM-dd', { locale: ru })
    const end = format(date2, 'yyyy-MM-dd', { locale: ru })
    let UserData = await fetch(`http://62.173.140.183:5000/api/paysheet?start=${start}&end=${end}`, {
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
        answer.users.map((user) => {
            if (user.rate) {
                if (user.rate.value) {
                    user.rate = [user.rate];
                }
            }else {
                user.rate = [{ value: 0, isNew: true }]
            }

            if (!user.award.award) {
                user.award = { award: 0, isNew: true };
            }
            if (!user.prepayment.prepayment) {
                user.prepayment = { prepayment: 0, isNew: true };
            }
            if (user.award && !user.vacation.vacation) {
                user.vacation = { vacation: 0, isNew: true };
            }
            user.sum=user.salary+user.award.award+user.vacation.vacation;
            user.remainder = user.salary - user.prepayment.prepayment + user.award.award

        })
        return answer;
    } else {
        const errAns = { status: UserData.status, message: answer.message }
        return errAns;
    }
}
export default getDataForSalaryTable;
