const DeleteProject = async (
  id: string,
  accessToken: string
  ) => {
  await fetch(`http://62.173.140.183:5000/api/projects/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    }),
    mode: 'cors',
    method: 'DELETE',
    credentials: 'include',//чтобы токен работал это поле должно быть во всех запросах
    keepalive: true
  })

}
export default DeleteProject;
