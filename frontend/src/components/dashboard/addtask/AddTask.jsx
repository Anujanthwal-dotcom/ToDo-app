import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBoxInactive } from "../../../redux/AddTaskBoxState";
import axios from 'axios';
import BASE from '../../../urls/Base';
function AddTask() {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    body: "",
    dueDate: "",
    priority: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    })
  }

  const handleTaskSubmit = async (e) => {
    console.log(taskData);
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE}/list/addTask`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        alert("Task added successfully!");
      }
      else {
        alert("Failed to add task. Please try again.");
        setTaskData({
          title: "",
          body: "",
          dueDate: "",
          priority: ""
        });
        return;
      }

    } catch (error) {
      alert("Failed to add task. Please try again."+error.message);
      setTaskData({
        title: "",
        body: "",
        dueDate: "",
        priority: ""
      });
      return;
    }
    setTaskData({
      title: "",
      body: "",
      dueDate: "",
      priority: ""
    });
    dispatch(setBoxInactive());
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-white w-[95%] max-w-xl p-8 rounded-2xl shadow-2xl z-50 border border-rose-200">

      <div className="flex justify-end">
        <button
          onClick={() => dispatch(setBoxInactive())}
          className="text-rose-500 hover:text-rose-700 text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      <h2 className="text-4xl text-rose-600 font-semibold text-center mb-6">Add New Task</h2>

      <form onSubmit={handleTaskSubmit} className="space-y-6 text-lg">
        <div>
          <label className="block text-gray-800 mb-1 font-medium">Title</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="title"
            value={taskData.title}
            className="w-full border-2 border-rose-300 focus:outline-none focus:border-rose-500 rounded-lg p-4 text-lg"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 mb-1 font-medium">Body</label>
          <textarea
            onChange={handleInputChange}
            name="body"
            value={taskData.body}
            className="w-full border-2 border-rose-300 focus:outline-none focus:border-rose-500 rounded-lg p-4 text-lg"
            rows="4"
            placeholder="Describe your task..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-gray-800 mb-1 font-medium">Due Date</label>
            <input
              onChange={handleInputChange}
              name="dueDate"
              value={taskData.dueDate}
              type="date"
              className="w-full border-2 border-rose-300 focus:outline-none focus:border-rose-500 rounded-xl p-4 text-lg h-[60px]"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-800 mb-1 font-medium">Priority</label>
            <select
              onChange={handleInputChange}
              name="priority"
              value={taskData.priority}
              className="w-full border-2 border-rose-300 focus:outline-none focus:border-rose-500 rounded-xl text-lg h-[60px] px-4"
              defaultValue=""
              required
            >
              <option value="">Select</option>
              <option value="high">🔥 High</option>
              <option value="medium">⭐ Medium</option>
              <option value="low">📘 Low</option>
            </select>
          </div>
        </div>


        <div className="flex justify-between items-center pt-6">
          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded transition duration-200 shadow-md"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => dispatch(setBoxInactive())}
            className="text-rose-600 hover:bg-rose-100 text-lg rounded px-8 py-3"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddTask;
