import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlanRow from '../Plan/PlanRow';
import './Dashboard.css';

export default function Dashboard(props) {
  
  function newPlan() {
    props.addPlan()
    .then(() => {
      props.planMan.getSetPlans();
    });
  }

  const plans = props.plans ? props.plans.map((plan, index) => (
    <PlanRow planMan={props.planMan} key={index} plan={plan}/>
  )) : null;

  
  return(
    <div className="container">
      <div className='panel-head'> 
        <h3 className='panel-title'>Plans</h3>
      </div>
      <table className='table border'>
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans}
          <tr>
          <td>
            <button type="button" className="btn btn-primary" onClick={newPlan}>Add Plan</button>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}