import Cookies from 'js-cookie';
import PlanScripts from './planScript';

const PlanManager = class {

  constructor(setPlan) {
    this.setPlan = setPlan;
  }

  getPlans() {
    const uid = Cookies.get('uid');
    return new Promise((resolve) => {
      fetch('http://localhost:8080/users/' + uid, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      }).then(data => data.json())
      .then(data => {
        resolve(data.map(plan => {
          return new PlanScripts(plan);
        }));
      })
    })
  }

  getSetPlans() {
    return new Promise(resolve => {
      this.getPlans().then(data => {
        if (data.message) {
          resolve(this.setPlan([]));
        } else {
          resolve(this.setPlan(data));
        }
      });
      
    })
  }
}

export default PlanManager;

