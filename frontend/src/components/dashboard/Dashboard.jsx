import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Today from './mainsection/Today'
import Priority from './mainsection/Priority'
import Latest from './mainsection/Latest'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import './css/CollapseSidebar.css';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AddTask from './addtask/AddTask'
function Dashboard() {
  const active = useSelector((state) => state.BarState.value);
  const [collapsed, setCollapsed] = useState(false);
  const addTaskBoxActivated = useSelector((state) => state.AddTaskBoxState.value);

  return (
    <div className="relative w-full h-screen flex flex-row overflow-hidden">

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



      {
        (addTaskBoxActivated===true)?(<div><AddTask /></div>):(<div></div>)
      }


    </div>
  )
}

export default Dashboard