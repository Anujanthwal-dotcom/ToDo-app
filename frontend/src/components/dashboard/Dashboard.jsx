import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Today from './mainsection/Today'
import Priority from './mainsection/Priority'
import Latest from './mainsection/Latest'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE from '../../urls/Base';
function Dashboard() {
  const active = useSelector((state) => state.BarState.value);

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
      <div className="w-[100%] h-[100vh] flex flex-row">
        <div className='w-[20%] h-[100vh]'>
          <Sidebar />
        </div>
        <div className="relative w-[80%] h-[100vh] bg-gray-200 flex flex-col">
          <Topbar />

          {
            active==='today' && <Today />
          }
          {
            active==='latest' && <Latest />
          }
          {
            active==='priority' && <Priority />
          }
        </div>
      </div>
  )
}

export default Dashboard