import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home/Home";
import About from "./components/about/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import MainLayout from "./main-layout/MainLayout";
import DashboardLayout from "./dashboard-layout/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <div>
      <Router>
  
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>


          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        
        </Routes>
      </Router>
    </div>

  );
}

export default App
