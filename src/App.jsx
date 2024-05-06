// App.jsx
import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Home/Register/Register";
import SetPassword from "./Components/Home/Register/SetPassword";
// import Login from "./Components/Home/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Home/Login/Login";
// import SideBar from "./Components/sideBar/SideBar";
import Role from "./Components/Home/Register/Role";
import CheckEmail from "./Components/Home/Register/CheckEmail";
import BusinessDashboard from "./Components/businessDashbord/BusinessDashboard";
// import CardItem from "./Components/Card/CardItem";
// import Home from "./Components/sideBar/Home";
import PreferenceModal from "./Components/userDashboard/UserDashBoard";
import { AuthContext } from "./Components/Home/AuthContext";

function App() {
  const {currentUser}=useContext(AuthContext);
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return<Navigate to="/"/>
    }
  return children
}
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<Role />} />
        <Route path="/checkemail/:email" element={<CheckEmail />} />
        <Route path="/forgot-password" element={<SetPassword />} />
        <Route path="/business" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><PreferenceModal /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </>
);
}
export default App;
