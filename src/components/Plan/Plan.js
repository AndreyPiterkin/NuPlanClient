import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Plan.css"
import getSems from "../../scripts/getSems";
import { useLocation } from 'react-router-dom'
import Semester from "../Semester/Semester";


export default function Plan() {

  const location = useLocation()
  const { pid } = location.state
  const [sems, setSems] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getSems(pid)
    .then(data => {
      if (!data) {
        setSems({ sems: []});
      } else {
        setSems(data)
      }
    })
    .finally(() => {
      setLoading(false)
    });
  }, [pid]);

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="row">
    {sems.sems.map((semester, index) =>
      (<Semester key={index} semester={semester}/>))}
    </div>
  );
}