import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBoxInactive } from "../../../redux/AddTaskBoxState";

function AddTask() {
  const dispatch = useDispatch();
  let [taskData,setTaskData]=useState({
    title : "",
    body : "",
    dueDate : "",
    priority : ""
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-white w-[100%] max-w-md p-6 rounded-lg shadow-lg z-50">

      <div className="flex justify-end">
        <button
          onClick={() => dispatch(setBoxInactive())}
          className="text-rose-500 hover:text-rose-700 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      <h2 className="text-2xl text-rose-600 text-center mb-4">Add Task</h2>

      <form className="space-y-4">
        <div>
          <label className="text-gray-700">Title</label>
          <input type="text" className="w-full border border-rose-300 rounded p-2" />
        </div>

        <div>
          <label className="text-gray-700">Body</label>
          <textarea className="w-full border border-rose-300 rounded p-2" rows="3" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-700">Due Date</label>
            <input type="date" className="w-full border border-rose-300 rounded p-2" />
          </div>
          <div className="flex-1">
            <label className="text-gray-700">Priority</label>
            <select className='w-full border border-rose-300 rounded p-2'>
                <option value={''}>-</option>
                <option value={'high'}>High</option>
                <option value={'medium'}>Medium</option>
                <option value={'low'}>Low</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded"
            onClick={() => dispatch(setBoxInactive())}
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => dispatch(setBoxInactive())}
            className="text-rose-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
