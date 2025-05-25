import React from 'react'
import Button from 'react-bootstrap/Button';
function Topbar() {
  return (
    <div className='absolute w-[100%] h-[10vh] py-6 px-15 z-10'>
      <Button variant="danger" className='float-right py-2 px-4'><div className='font-bold'>Logout</div></Button>
    </div>
  )
}

export default Topbar