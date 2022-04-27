import React, {useEffect} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Plan.css"
import SemManager from "../../scripts/semManager";
import SemesterScript from "../../scripts/semesterScript";
import { useLocation } from 'react-router-dom'
import Semester from "../Semester/Semester";
import SemesterPopup from "../Semester/SemesterPopup";

export default function Plan() {

  const location = useLocation()
  const { pid } = location.state
  const [sems, setSems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sm = new SemManager(pid, setSems);

  useEffect(() => {
    sm.getSetSem()
    .then(() => {
      setLoading(false)
    })
  }, [pid]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div className="row">
      {sems.map((semester, index) =>
        (<Semester key={index} semester={semester.props} refresh={sems} semMan={sm}/>))}
      </div>
      <div className="row align-items-center justify-content-center" style={{
        marginTop: "20px"
      }}>
      <SemesterPopup handleSubmit={SemesterScript.createSem} sm={sm}/>
      </div>
      <div className="row align-items-center justify-content-center" style={{
        marginTop: "10px" 
      }}>
        <button type="button" className="btn btn-danger add-button" onClick={() => {
          sm.deleteSem(pid)
          .then(() => {
            sm.getSetSem()
          });
        }}>Delete Semester</button> 
      </div>
    </div>  
  );
}