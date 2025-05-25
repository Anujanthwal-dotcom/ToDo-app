import React from 'react'
import { MdOutlineWatchLater } from "react-icons/md"
import { BiSolidTimeFive } from "react-icons/bi"
import { IoMdPricetags } from "react-icons/io"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setToday, setLatest, setPriority } from "../../../redux/BarState"
import Calendar from 'react-calendar';
import '../css/customCalendar.css';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Sidebar() {
  const active = useSelector((state) => state.BarState.value);
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
 
  return (
    <div className={`h-full bg-gray-50 py-30 px-4 flex flex-col justify-between shadow-lg`}>
      
      <div className='flex flex-col gap-2'>

        {/* Navigation Buttons */}
        <button name='today' className={`rounded flex items-center gap-2 w-full py-2 px-3 text-left  hover:bg-rose-100 transition-colors ${active === "today" ? "bg-rose-100" : ""}`} onClick={() => dispatch(setToday())}>
          <BiSolidTimeFive className="text-orange-600 text-2xl" />
          <span className={' text-xl font-bold' + `${active === "today" ? " text-red-600" : ""}`}>Today</span>
        </button>
        <button name='latest' className={`rounded flex items-center gap-2 w-full py-2 px-3 text-left hover:bg-rose-100 transition-colors ${active === "latest" ? "bg-rose-100" : ""}`} onClick={() => dispatch(setLatest())}>
          <MdOutlineWatchLater className="text-orange-600 text-2xl" />
          <span className={'text-xl font-bold' + `${active === "latest" ? " text-red-600" : ""}`}>Latest</span>
        </button>

        <button name='priority' className={`rounded flex items-center gap-2 w-full py-2 px-3 text-left hover:bg-rose-100 transition-colors ${active === "priority" ? "bg-rose-100" : ""}`} onClick={() => dispatch(setPriority())}>
          <IoMdPricetags className="text-orange-600 text-2xl" />
          <span className={' text-xl font-bold' + `${active === "priority" ? " text-red-600" : ""}`}>Priority</span>
        </button>

      </div>
      <Calendar
        onChange={setValue}
        value={value}
        className="w-fit rounded-2xl border border-red-300 bg-red-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg"
      />

      
    </div>
  )
}

export default Sidebar