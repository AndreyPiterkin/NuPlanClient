import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Plan/Plan.css"
import Class from "../Class/Class"

export default function Semester(props) {
  return (
    <div className="col-6">
      <div className="container">
      <div className='panel-head'> 
        <h3 className='panel-title'>{props.semester[0].sem + " " + props.semester[0].year}</h3>
        <h3 className="panel-title">Expected workload: {props.semester[0].workload} hours</h3>
      </div>
      <table className='table border'>
        <thead>
          <tr>
            <th>Code</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {(props.semester[0].is_coop ? [0] : [0,1,2,3,4,5,6]).map(course => {
            if (props.semester[course] && props.semester[course].class_code) {
              return (<Class key={course} class={props.semester[course]} semMan={props.semMan} usid={props.semester[0].usid}/>)
            } else {
              return (<Class key={course} class={undefined} semMan={props.semMan} usid={props.semester[0].usid}/>)
            }
          })}
        </tbody>
      </table>
      </div>
    </div>);
}


