import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FaHome, FaFacebook } from "react-icons/fa";
import Metting from "./Date/form/Meeting";
import Invoice from "./Date/form/Sale_invoice";
import Todo from "./Todo/todo";
import Medical from "./mock/warehouse";
import Phama from "./mock/listexport";
import Cancel from "./mock/Exportcancel";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app">
        
      </div>

      <Routes>
        <Route path="/" element={<Invoice />}/> 
        <Route path="/todo" element={<Todo />}/> 
       
        <Route path="/metting" element={<Metting />}/> 
        <Route path="/medical" element={<Medical />}/> 
        <Route path="/phama" element={<Phama />}/> 
        <Route path="/cancel" element={<Cancel />}/> 
      </Routes>
      
    </>
  );
}

export default App;
