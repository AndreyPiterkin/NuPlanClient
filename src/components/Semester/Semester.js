import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Plan/Plan.css"
import Class from "../Class/Class"

export default function Semester(props) {

  return (
    <div className="col d-flex">
      <div className="container">
      <div className='panel-head'> 
        <h3 className='panel-title'>{props.semester[0].sem + " " + props.semester[0].year}</h3>
      </div>
      <table className='table border'>
        <thead>
          <tr>
            <th>Code</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {[0,1,2,3,4,5,6].map(course => 
            <Class key={course} class={props.semester[course]}/>)}
        </tbody>
      </table>
      </div>
    </div>);
}


