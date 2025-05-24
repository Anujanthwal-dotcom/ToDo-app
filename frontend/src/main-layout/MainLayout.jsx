import React from 'react'
import Topbar from '../components/navbar/Topbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

function MainLayout() {
  return (
    <div>
        <Topbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout