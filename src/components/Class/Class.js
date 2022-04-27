import React, {useState} from "react";
import ClassPopup from "./ClassPopup";
import ReactTooltip from "react-tooltip";

import "./Class.css"
import "bootstrap/dist/css/bootstrap.min.css";


export default function Class(props) {

  const trigger = (<tr {...((props.class && props.class.prereqs) ? {"data-tip": true, "data-for":"prereq", className: "prereq"} : {className: "std"})}>
  <td className="table-row">{(props.class && props.class.class_code) ? props.class.class_code: null}
  {(props.class && props.class.prereqs) ? 
    <ReactTooltip id="prereq" type="error" place="left" effect="solid">
    {props.class.prereqs.split(',').map((req, index) => {
        return (<div key={index}>Required: {req} </div>)
      })}
    </ReactTooltip> : null
  } 
  </td>
  <td className="table-row">{(props.class && props.class.class_level) ? props.class.class_level: null}</td>
</tr>);

  return (
    <ClassPopup class={props.class} trigger={trigger}
    semMan={props.semMan}
    usid={props.usid}
    />
  )
}
