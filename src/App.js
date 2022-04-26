import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login/Login"
import Signup from "./components/Login/Signup"
import Dashboard from "./components/Dashboard/Dashboard"
import Plan from "./components/Plan/Plan"

import useToken from './useToken';
import PlanManager from './scripts/planManager';
import PlanScripts from './scripts/planScript';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";

function App() {

  
  const { token, setToken } = useToken();
  const [plans, setPlans] = React.useState([]);

  const pm = new PlanManager(setPlans);

  React.useEffect(() => {
    if (token) {
      pm.getSetPlans();
    }
   }, [token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard plans={plans} planMan={pm} addPlan={PlanScripts.createPlan}/>} />
        <Route path="/plan" element={<Plan/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login setToken={setToken}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
