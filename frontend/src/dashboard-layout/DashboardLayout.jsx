import React from 'react'
import { Outlet } from 'react-router-dom'
import store from '../redux/Store';
import { Provider } from 'react-redux';
function DashboardLayout() {
  return (
    <div>
      <Provider store={store}>

        <Outlet />

      </Provider>
    </div>
  )
}

export default DashboardLayout