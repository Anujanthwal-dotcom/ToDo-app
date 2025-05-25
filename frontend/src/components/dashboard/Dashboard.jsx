import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Today from './mainsection/Today'
import Priority from './mainsection/Priority'
import Latest from './mainsection/Latest'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BASE from '../../urls/Base';
import './css/CollapseSidebar.css';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
function Dashboard() {
  const active = useSelector((state) => state.BarState.value);
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();
  
      useEffect(() => {
          const validateToken = async()=>{
              const token = localStorage.getItem("token");
  
              if(token){
                  const response = await axios.get(`${BASE}/user/validate`, {
                      headers: {
                          authorization: `Bearer ${token}`
                      }
                  });
  
                  if(response.data.valid===true){
                      navigate("/dashboard");
                  }
                  else{
                    navigate("/login");
                    localStorage.removeItem("token");
                  }
              }
          }
  
          validateToken();
      }, [navigate]);

  return (
      <div className="w-full h-screen flex flex-row overflow-hidden">
      
      <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar />
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <div className="relative flex-1 h-full bg-gray-200 flex flex-col">
        <Topbar />
        {active === 'today' && <Today />}
        {active === 'latest' && <Latest />}
        {active === 'priority' && <Priority />}
      </div>
    </div>
  )
}

export default Dashboard