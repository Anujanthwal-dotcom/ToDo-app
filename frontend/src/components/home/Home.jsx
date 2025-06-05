import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import BASE from '../../urls/Base';
import axios from 'axios';
import product from '../../product/product.png'
function Home() {
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

    return (
        <div className='w-[100%] h-[100vh] flex flex-col justify-center mt-10'>
            <div className='container flex flex-row space-x-50 items-center'>
                <div>
                    <div className="text-5xl font-bold text-gray-800 mt-8">
                        Organize your <span className="text-blue-600">life</span>,<br />
                        with <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent font-extrabold">Todo.</span>
                    </div>
                    <div className="text-3xl font-semibold text-gray-400 mt-4">
                        A simple and elegant way to manage<br /> your tasks and notes.
                    </div>
                    <div className="mt-8">
                        <Link to='/login'>
                        <button className="rounded border-2 border-red-500 px-8 py-3 font-bold text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
                            Write a Note
                        </button>
                        </Link>
                    </div>
                </div>

                {/**product image. */}
                <div className='w-[80%]'>
                    <img src={product} alt="Product" className="mt-10 w-full h-auto rounded-lg shadow-lg" />
                </div>
            </div>

        </div>
    )
}

export default Home