import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import BASE from '../../urls/Base';
import {toast} from 'react-toastify';
function Login() {

  let [user,setUser] = React.useState({
    email: "",
    password: ""
  });
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
              }
          }
  
          validateToken();
      }, [navigate]);

  const handleLogin = async (e)=>{
    e.preventDefault();
    console.log(user);
    try{
      const response = await axios.post(`${BASE}/user/login`, user);
      
      if(response.data.token!=null){
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting to dashboard...");
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }

  }

  return (
    <div className='container w-[100%] h-[100vh] flex flex-row space-x-40 items-center justify-center bg-white'>
      <div className='w-[30%] flex flex-col justify-center'>

        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input name='email' type="email" onChange={(e) => setUser({...user, email: e.target.value})} className="border-2 border-gray-300 rounded px-4 py-2 w-full mb-4" placeholder="Enter your email" />
        
        <label className="block text-gray-700 font-semibold mb-2">Password</label>
        <input name='password' type="password" onChange={(e) => setUser({...user, password: e.target.value})} className="border-2 border-gray-300 rounded px-4 py-2 w-full mb-4" placeholder="Enter your password" />
        
        <button onClick={(e)=>handleLogin(e)} className="rounded px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300">
          Login
        </button>
        
        <div className="mt-4 text-gray-500">
          Don't have an account? 
          <Link to="/signup" className='text-decoration-none'>
          <span className="text-red-500 font-semibold cursor-pointer"> Sign Up</span>
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

export default Login