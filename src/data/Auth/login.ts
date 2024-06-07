const loginReq=async (
    email:string,
    password:string
    )=>{
    const userData=await fetch('http://62.173.140.183:5000/api/auth/login',{
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept':'application/json'
          }),
        mode: 'cors',//чтобы сервер не ругался
        method:'POST',
        body:JSON.stringify({email:email,password:password}),
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
export default loginReq;
