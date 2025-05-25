import React from 'react'
import { MdOutlineWatchLater } from "react-icons/md"
import { BiSolidTimeFive } from "react-icons/bi"
import { IoMdPricetags } from "react-icons/io"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {setToday,setLatest,setPriority} from "../../../redux/BarState"

function Sidebar() {
  const active = useSelector((state) => state.BarState.value);
  const dispatch = useDispatch();


  return (
    <div className='h-full bg-gray-50 p-4 shadow-lg'>
      <div className='flex flex-col gap-2'>
        
        {/* Navigation Buttons */}
        <button name='today' className={`rounded flex items-center gap-2 w-full py-2 px-3 text-left  hover:bg-orange-100 transition-colors ${active === "today" ? "bg-orange-100" : ""}`} onClick={()=> dispatch(setToday())}>
          <BiSolidTimeFive className="text-orange-600 text-2xl" />
          <span className=' text-xl'>Today</span>
        </button>
        <button name='latest' className={`rounded flex items-center gap-2 w-full py-2 px-3 text-left hover:bg-orange-100 transition-colors ${active === "latest" ? "bg-orange-100" : ""}`} onClick={()=> dispatch(setLatest())}>
          <MdOutlineWatchLater className="text-orange-600 text-2xl" />
          <span className=' text-xl'>Latest</span>
        </button>

        <button name='priority' className={`rounded flex items-center gap-2 w-full py-2 px-3 text-left hover:bg-orange-100 transition-colors ${active === "priority" ? "bg-orange-100" : ""}`} onClick={()=> dispatch(setPriority())}>
          <IoMdPricetags className="text-orange-600 text-2xl" />
          <span className=' text-xl'>Priority</span>
        </button>

        
      </div>
    </div>
  )
}

export default Sidebar