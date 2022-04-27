import Popup from "reactjs-popup";
import React, {useState} from "react";
import 'reactjs-popup/dist/index.css';
import "../Plan/Plan.css"


export default function ClassPopup(props) {
  const contentStyle = { width: "20%" };
  const [code, setCode] = useState("");
  const [level, setLevel] = useState("");

  const [codeError , setCodeError] = useState("");
  const [levelError, setLevelError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!level.match(/^[0-9]+$/)) {
      formIsValid = false;
      setLevelError(
        "Must be a valid course level"
      );
    } else {
      setLevelError("");
      formIsValid = true;
    }

    if (!code.match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      setCodeError(
        "Must be a valid code"
      );
    } else {
      setCodeError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const editClass = async (e, close) => {
    e.preventDefault();
    setCodeError("");
    setLevelError("");
    if (handleValidation()) {
      const classes = await props.semMan.getValidClasses();
      if (classes.some(class_ => (class_.code == code && class_.level == level))) {
        if (props.class && props.class.class_code && props.class.class_level) {
          props.semMan.deleteClass(props.usid, props.class.class_code, props.class.class_level)
          .then(() => {
            props.semMan.addClass(props.usid, code, level)
            .then((data) => {
              props.semMan.getSetSem().then(() => {
              });
            });
          });
        } else {
          props.semMan.addClass(props.usid, code, level)
          .then((data) => {
            props.semMan.getSetSem().then(() => {
              close();
            });
          });
        }
      } else {
        setLevelError("Class Not Valid");
      }
    }
  };

  const deleteClass = async (e, close) => {
    e.preventDefault();
    if (props.class && props.class.class_code && props.class.class_level) {
      props.semMan.deleteClass(props.class.usid, props.class.class_code, props.class.class_level)
      .then(() => {
        props.semMan.getSetSem().then(() => {
          close();
        });
      });
    } else {
      setLevelError("Can't delete empty class");
    }
  };

  return(
      <Popup trigger={props.trigger} modal contentStyle={contentStyle}>
        {close => (
          <div className="container">
          <form onSubmit={(e) => editClass(e, close)}>
            <div className="form-group">
              <label>Code</label>
              <input
                type="text"
                className="form-control"
                placeholder={props.class? props.class.class_code : "Enter code"}
                onChange={e => setCode(e.target.value)}
              />
              <small className="text-danger form-text">
                {codeError}
              </small>
            </div>
            <div className="form-group">
              <label>Level</label>
              <input
                type="text"
                className="form-control"
                placeholder={props.class ? props.class.class_level : "Enter level"}
                onChange={e => setLevel(e.target.value)}
              />
              <small className="text-danger form-text">
                {levelError}
              </small>
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
                <button type="button" className="btn btn-danger" onClick={(e) => deleteClass(e, close)}>Delete</button>
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
      </Popup>
  )
}