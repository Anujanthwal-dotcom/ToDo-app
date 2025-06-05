import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import BASE from '../../../urls/Base';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHigh, setMedium, setLow } from '../../../redux/PriorityTabState';
function Priority() {
  // eslint-disable-next-line no-unused-vars
  let [priorityWiseTasks, setPriorityWiseTasks] = useState([]);
  let navigate = useNavigate();

  let priorityBarActive = useSelector((state) => state.PriorityTabState.value);
  let dispatch = useDispatch();

  useEffect(() => {

    //Make changes in this code. It's rough and copied. 
    const getPriorityWiseTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        // Validate the token
        const validateResponse = await axios.get(`${BASE}/user/validate`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log("Response from validate token:", validateResponse.data);

        // Fetch high priority tasks
        const response = await axios.get(`${BASE}/list/getHighPriorityTasks`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const tasks = response.data.lists;

        if (!tasks || tasks.length === 0) {
          toast.info('No high priority tasks found');
          return;
        }

        toast.success('High priority tasks fetched successfully');
        setPriorityWiseTasks(tasks);

      } catch (error) {
        console.error("Error occurred:", error);

        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error('Cannot get priority tasks');
        }
      }
    };
    getPriorityWiseTasks();
  }, [navigate]);

  // eslint-disable-next-line no-unused-vars
  const getMediumPriorityTasks = async () => {
    dispatch(setMedium());
    try {
      const response = await axios.get(`${BASE}/list/getMediumPriorityTasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.data.lists || response.data.lists.length === 0) {
        toast.info('No medium priority tasks found');
        return;
      }
      setPriorityWiseTasks(response.data.lists);
    }
    // eslint-disable-next-line no-unused-vars
    catch (error) {
      toast.error('Cannot get medium priority tasks');
    }
  }

  // eslint-disable-next-line no-unused-vars
  const getHighPriorityTasks = async () => {
    dispatch(setHigh());
    try {
      const response = await axios.get(`${BASE}/list/getHighPriorityTasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.data.lists || response.data.lists.length === 0) {
        toast.info('No high priority tasks found');
        return;
      }
      setPriorityWiseTasks(response.data.lists);
    }
    // eslint-disable-next-line no-unused-vars
    catch (error) {
      toast.error('Cannot get high priority tasks');
    }
  }
  // eslint-disable-next-line no-unused-vars
  const getLowPriorityTasks = async () => {
    dispatch(setLow());
    try {
      const response = await axios.get(`${BASE}/list/getLowPriorityTasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.data.lists || response.data.lists.length === 0) {
        toast.info('No low priority tasks found');
        return;
      }

      setPriorityWiseTasks(response.data.lists);
    }
    // eslint-disable-next-line no-unused-vars
    catch (error) {
      toast.error('Cannot get low priority tasks');
    }
  }


  return (
    <div className='h-full w-full'>
      <div className='container mt-30'>
        <div className='text-4xl font-bold text-gray-800 mb-4'>
          Mark the urgent
        </div>
        <hr />


        {/** Priority buttons */}
        <div className='flex flex-row gap-4 mt-10'>
          <button onClick={() => getHighPriorityTasks()} className={`rounded px-6 py-2 ${priorityBarActive === "high" ? "bg-gray-300" : ""} hover:bg-gray-300`}><span className='text-2xl font-semibold text-gray-600'>High</span></button>
          <button onClick={() => getMediumPriorityTasks()} className={`rounded px-6 py-2 ${priorityBarActive === "medium" ? "bg-gray-300" : ""} hover:bg-gray-300`}><span className='text-2xl font-semibold text-gray-600'>Medium</span></button>
          <button onClick={() => getLowPriorityTasks()} className={`rounded px-6 py-2 ${priorityBarActive === "low" ? "bg-gray-300" : ""} hover:bg-gray-300`}><span className='text-2xl font-semibold text-gray-600'>Low</span></button>
        </div>

        <div className='flex flex-col mt-4 items-center overflow-y-auto scrollbar-hide h-full'>
          {
            priorityWiseTasks.length === 0 ? (
              <div className='text-gray-600 text-2xl font-semibold mt-10 w-full text-center'>
                No tasks found
              </div>
            ) : (

              priorityWiseTasks.map((task, index) => (
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

export default Priority