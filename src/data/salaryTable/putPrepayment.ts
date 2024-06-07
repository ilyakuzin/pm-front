import { format } from "date-fns";
import { ru } from "date-fns/locale";

const putPrepaymentReq=async (
    data:{
        value:number,
        date: Date,
    },
    Id:string,
    accessToken:string
    )=>{
        const date1=format(data.date, 'yyyy-MM-dd', { locale: ru })
        const newData={prepayment:data.value,date:date1}
        console.log(accessToken);
    const userData=await fetch(`http://62.173.140.183:5000/api/paysheet/prepayments/${Id}`,{
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }),
        mode: 'cors',//чтобы сервер не ругался
        method:'PUT',
        body:JSON.stringify(newData),
        credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
        keepalive:true,

        }
    )
    const answer=await userData.json();

    if(userData.ok){
        return answer;
      }else{
        const errAns={ status:userData.status,message:answer.message}
        return errAns;
      }
}
export default putPrepaymentReq;
