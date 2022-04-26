import React from "react";
import "./Class.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Class(props) {
  return (
    <tr>
      <td className="table-row">{(props.class && props.class.class_code) ? props.class.class_code: null}</td>
      <td className="table-row">{(props.class && props.class.class_level) ? props.class.class_level: null}</td>
    </tr>
  )
}
