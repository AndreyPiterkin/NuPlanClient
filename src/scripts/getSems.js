
export default function getSems(pid) {
  return new Promise((resolve) => {
    fetch('http://localhost:8080/plans/' + pid, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    }).then(data => resolve(data.json()));
  })
}