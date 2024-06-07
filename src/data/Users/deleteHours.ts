const deleteHours = async (
    id: string,
    accessToken: string
    ) => {
    await fetch(`http://62.173.140.183:5000/api/hours/delete/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      }),
      mode: 'cors',
      method: 'DELETE',
      credentials: 'include',
      keepalive: true
    })

  }
  export default deleteHours;
