import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'

function RootLayout() {
  return (
    <div className="rootLayout">
        {/* NAV */}
        <Navbar/>
      <Outlet />
      {/* Footer */}
    </div>
  )
}

export default RootLayout
