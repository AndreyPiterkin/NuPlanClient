import SemesterScript from "./semesterScript";

const SemManager = class {

  constructor(pid, setSem) {
    this.setSem = setSem;
    this.pid = pid;
  }

  deleteSem(pid) {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/sem/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pid
        }),
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data);
      });
    })
  }

  getValidClasses() {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/class/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data);
      });
    })
  }

  getValidSems() {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/semester/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data);
      });
    })
  }

  getSems() {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/plans/' + this.pid, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data.sems.map(sem => {
          return new SemesterScript(sem)
        }));
      });
    })
  }

  getSetSem() {
    return new Promise((resolve) => {
      this.getSems().then(data => {
        if (data.message) {
          resolve(this.setSem([]));
        } else {
          resolve(this.setSem(data));
        }
      });
    });
  }

  addClass(sid, ccode, clvl) {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/class/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sid,
          ccode,
          clvl
        }),
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data);
      });
    })
  }

  
  deleteClass(sid, ccode, clvl) {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/class/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sid,
          ccode,
          clvl
        }),
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data);
      });
    })
  }
}

export default SemManager;

