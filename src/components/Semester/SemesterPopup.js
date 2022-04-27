import Popup from "reactjs-popup";
import React, {useState} from "react";
import 'reactjs-popup/dist/index.css';
import "../Plan/Plan.css"

export default function SemesterPopup(props) {
  const contentStyle = { width: "20%" };

  const [semes, setSemes] = useState("");
  const [year, setYear] = useState("");
  const [yearError , setYearError] = useState("");
  const [semesterError, setSemesterError] = useState("");
  const [coop, setCoop] = useState(false);

  const handleValidation = (event) => {
    let formIsValid = true;
    if (!year.match(/^[0-9]+$/)) {
      formIsValid = false;
      setYearError(
        "Must be a valid year"
      );
    } else {
      setYearError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const newSemesterSubmit = async (e, close) => {
    e.preventDefault();
    setYearError("");
    setSemesterError("");
    if (handleValidation()) {
      const token = await props.sm.getValidSems()
      if (!token.message) {
        if (token.some(semester => semester.sem.toLowerCase() === semes.toLowerCase())) {
          setSemes(token);
          props.handleSubmit(props.sm.pid, semes, year, (coop == "on" ? true : false))
          .then(() => {
            props.sm.getSetSem()
            close();
            setCoop(false);
            setSemes("");
            setYear("");
          });
        } else {
          setSemesterError("Semester Not Valid");
        }
      } else {
        setSemesterError(token.message);
      }
    }  
  };
  
  return( 
  <Popup trigger={<button type="button" className="btn btn-success add-button align-items-center justify-content-center">Add Semester</button>} modal contentStyle={contentStyle}>
  {close => (
    <div className="container">
    <form onSubmit={(e) => newSemesterSubmit(e, close)}>
      <div className="form-group">
        <label>Semester</label>
        <input
          type="text"
          className="form-control"
          placeholder="Fall, Spring, Summer 1, Summer 2"
          onChange={e => setSemes(e.target.value)}
        />
        <small className="text-danger form-text">
          {semesterError}
        </small>
      </div>
      <div className="form-group">
        <label>Year</label>
        <input
          type="text"
          className="form-control"
          placeholder="2022"
          onChange={e => setYear(e.target.value)}
        />
        <small className="text-danger form-text">
          {yearError}
        </small>
      </div>
      <div className="form-group">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-auto">
            <label>Coop</label>
          </div>
          <div className="col">
            <input
              type="checkbox"
              className="form-control"
              onChange={e => setCoop(e.target.value)}
            />
          </div>
        </div>
        
      </div>
      <div style={{
        height: "10px"
      }}></div>
      <div className="row">
        <div className="col">
          <button type="submit" className="btn btn-primary" style={{
            float: "left"
          }}>
            Submit
          </button>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-danger" onClick={close} style={{
            float: "right"
          }}>
            Cancel
          </button>
        </div>
      </div>
      <div style={{
        height: "25px"
      }}></div>
      </form>
    </div>
  )}
</Popup>)
}