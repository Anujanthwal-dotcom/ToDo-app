import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function Topbar() {
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className='absolute w-[100%] h-[10vh] py-6 px-15 z-10'>
      <Button onClick={()=>logout()} variant="danger" className='float-right py-2 px-4'><div className='font-bold'>Logout</div></Button>
    </div>
  )
}

export default Topbar