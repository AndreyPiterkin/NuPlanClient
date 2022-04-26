import React from "react";
import {NavLink} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Plan.css"

export default function Plan(props) {
  
  function handleDelete(e) {
    e.preventDefault();
    props.plan.deletePlan().then(() => {
      props.planMan.getSetPlans();
    });
  }

  function handleRename(e, isName) {
    e.preventDefault();
    if (!isName) {
      props.plan.renameDesc(e.currentTarget.textContent)
      .then(() => {
        props.planMan.getSetPlans();
      });
    } else {
      props.plan.renamePlan(e.currentTarget.textContent)
      .then(() => {
        props.planMan.getSetPlans();
      });
    }
  }

  return (
    <tr>
      <td className="rowName">
        <NavLink className="planNav" to="/plan" state={{pid: props.plan.props.plan_id}}>
          <p>{props.plan.props.plan_id}</p>
        </NavLink>
      </td>
      <td className="rowName">
        <p contentEditable={true} suppressContentEditableWarning={true} onBlur={e => handleRename(e, true)}>{props.plan.props.plan_name}</p>
      </td>
      <td className="rowDesc">
        <p contentEditable={true} suppressContentEditableWarning={true} onBlur={e => handleRename(e, false)}>{props.plan.props.plan_description ? props.plan.props.plan_description : "No description"}</p>
      </td>
      <td className="rowAction">
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </td> 
    </tr>
  );
}