
const SemesterScript = class {

  constructor(props) {
    this.props = props;
  }

  static createSem(pid, sem, year, is_coop) {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/sem/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pid,
          sem,
          year,
          is_coop
        }),
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(new SemesterScript(data));
      });
    })
  }

  
}

export default SemesterScript;
