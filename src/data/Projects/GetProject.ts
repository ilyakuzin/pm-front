const GetProjectReq = async (
  id: string
) => {
  let ProjectData = await fetch(`http://62.173.140.183:5000/api/projects/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + id,
    }),
    mode: 'cors',
    method: 'GET',
    credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
    keepalive: true
  }
  )
  const answer = await ProjectData.json();
  if (ProjectData.ok) {
    return answer;
  } else {
    const errAns = { status: ProjectData.status, message: answer.message }
    return errAns;
  }
}
export default GetProjectReq;
