import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE from '../../urls/Base';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
function Signup() {
  let navigate = useNavigate();
  let user = {
    name: "",
    email: "",
    password: ""
  };
  const handleChange = (e) => {
    user[e.target.name] = e.target.value;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE}/user/register`, user);
      if (response.data.token != null) {
        localStorage.setItem("token", response.data.token);
        toast.success("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup. Please try again.");
    }
  }
  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(`${BASE}/user/validate`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if (response.data.valid === true) {
          navigate("/dashboard");
        }
      }
    }

    validateToken();
  }, [navigate]);

  return (
    <div className='container w-[100%] h-[100vh] flex flex-row space-x-40 items-center justify-center bg-white'>
      <div className='w-[30%] flex flex-col justify-center'>
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input onChange={(e) => handleChange(e)} name='name' type="text" className="border-2 border-gray-300 rounded px-4 py-2 w-full mb-4" placeholder="Enter your name" />
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input onChange={(e) => handleChange(e)} name='email' type="email" className="border-2 border-gray-300 rounded px-4 py-2 w-full mb-4" placeholder="Enter your email" />
        <label className="block text-gray-700 font-semibold mb-2">Password</label>
        <input onChange={(e) => handleChange(e)} name='password' type="password" className="border-2 border-gray-300 rounded px-4 py-2 w-full mb-4" placeholder="Enter your password" />
        <button onClick={(e) => handleSubmit(e)} className="rounded px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300">
          Sign up
        </button>
        <div className="mt-4 text-gray-500">
          Already have an account? 
          <Link to="/login" className='text-decoration-none'>
          <span className="text-red-500 font-semibold cursor-pointer"> Log In</span>
          </Link>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className="text-5xl font-bold text-gray-800 mt-8">
          Organize your <span className="text-blue-600">life</span>,<br />
          with <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent font-extrabold">Todo.</span>
        </div>
        <div className="text-3xl font-semibold text-gray-400 mt-4">
          A simple and elegant way to manage<br /> your tasks and notes.
        </div>
      </div>
    </div>
  )
}

export default Signup