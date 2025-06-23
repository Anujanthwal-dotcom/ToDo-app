import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE from '../../../urls/Base';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { setBoxActive } from '../../../redux/EditTaskBoxState';
import EditTask from '../editTask/EditTask';

function Latest() {

  let navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  let [latestTasks, setLatestTasks] = useState([]);
  let editTaskBoxState = useSelector((state) => state.EditTaskBoxState.value);
  let dispatch = useDispatch();

  useEffect(() => {



    const getLatestTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.get(`${BASE}/user/validate`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(response1 => {
          console.log("Response from validate token:", response1.data);
        }
        ).then(async () => {
          const response = await axios.get(`${BASE}/list/getLatestTasks`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.data.lists || response.data.lists.length === 0) {
            toast.info('No latest tasks found');
            return;
          }

          setLatestTasks(response.data.lists);
        })
          .catch(error => {
            console.error("Error validating token:", error);
            if (error.response && error.response.status === 403) {
              localStorage.removeItem("token");
              navigate("/login");
            }
          });

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Cannot get latest tasks');
      }
    }
    getLatestTasks();
  }, [navigate]);

  const handleDelete = async (taskId) => {
    let response = await axios.delete(`${BASE}/list/deleteTask/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      toast.success('Task deleted successfully');
      setLatestTasks(latestTasks.filter(task => task._id !== taskId));
    }
    else {
      toast.error('Failed to delete task');
    }
  }



  return (
    <div className='h-full w-full overflow-y-scroll scrollbar-hide'>
      <div className='container mt-30'>
        <div className='text-4xl font-bold text-gray-800 mb-4'>
          Recent
        </div>
        <hr />

        <div className='flex flex-col items-center'>
          {
            latestTasks.length === 0 ? (
              <div className='text-gray-600 text-2xl font-semibold mt-10'>
                No tasks found
              </div>
            ) : (
              latestTasks.map((task, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 border border-gray-300 rounded-xl shadow-sm p-4 mb-4 w-full transition hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {/* Update Button */}
                      <button
                        onClick={() => dispatch(setBoxActive())}
                        className="text-gray-500 hover:text-blue-600 transition"
                        title="Edit task"
                      >
                        <FiEdit size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-gray-500 hover:text-red-600 transition"
                        title="Delete task"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mt-2">{task.body}</p>

                  <div className="flex justify-between items-center mt-3 text-sm">
                    <span className="text-gray-600">
                      Due:{" "}
                      <span className="font-medium">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${task.priority === "high"
                        ? "bg-red-200 text-red-800"
                        : task.priority === "medium"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                        }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  {(editTaskBoxState === false) ?
                    (<div></div>)
                    :
                    (<EditTask id={task._id} title={task.title} body={task.body} dueDate={new Date(task.dueDate).toISOString().split('T')[0]} priority={task.priority}/>)
                  }
                </div>
              ))

            )
          }
        </div>
      </div>
    </div>
  )
}

export default Latest