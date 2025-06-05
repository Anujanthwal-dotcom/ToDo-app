import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE from '../../../urls/Base';
import { toast } from 'react-toastify';
import { useState } from 'react';
function Today() {

  // eslint-disable-next-line no-unused-vars
  let [todayTasks, setTodayTasks] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {

    const getTodayTasks = async () => {
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
          const response = await axios.get(`${BASE}/list/getTodayTasks`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.data.lists || response.data.lists.length === 0) {
            toast.info('No tasks for today');
            return;
          }

          setTodayTasks(response.data.lists);
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
        toast.error('Cannot get today tasks');
      }
    }

    getTodayTasks();
  }, [navigate]);

  return (
    <div className='h-full w-full overflow-y-scroll scrollbar-hide'>
      <div className='container mt-30'>
        <div className='text-4xl font-bold text-gray-800 mb-4'>
          Today's Tasks
        </div>
        <hr />

        <div className='flex flex-col items-center'>
          {
            todayTasks.length === 0 ? (
              <div className='text-gray-600 text-2xl font-semibold mt-10'>
                No tasks for today
              </div>
            ) : (

              todayTasks.map((task, index) => (
                <div key={index} className='text-gray-800 text-lg font-semibold mt-2 w-full'>
                  <div className=''>
                    <span>{task.title}</span>
                    <span className='text-gray-500 text-sm'>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className='text-gray-600 text-sm'>{task.description}</p>
                </div>
              ))

            )
          }
        </div>

      </div>
    </div>
  )
}

export default Today