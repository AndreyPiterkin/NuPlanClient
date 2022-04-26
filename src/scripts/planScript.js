import Cookies from 'js-cookie';

const PlanScripts = class {

  constructor(props) {
    this.props = props;
  }

  deletePlan() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/plans/' + this.props.plan_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(data => {
        resolve(data.json())
      });
    })
  }
  
  renamePlan(text) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/plans/rename/' + this.props.plan_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({pid: this.props.plan_id, newName: text}),
        credentials: 'include'
      }).then(data => {
        resolve(data.json())
      });
    })
   }
  
  renameDesc(text) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/plans/redesc/' + this.props.plan_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({pid: this.props.plan_id, newDesc: text}),
        credentials: 'include'
      }).then(data => {
        resolve(data.json())
      });
    })
   }
  
  static createPlan() {
    const tokenString = Cookies.get('uid');
    return new Promise((resolve) => {
      fetch('http://localhost:8080/plans/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid: tokenString}),
        credentials: 'include'
      }).then(data => {
        resolve(new PlanScripts(data.json()));
      });
    })
  }
}

export default PlanScripts;
