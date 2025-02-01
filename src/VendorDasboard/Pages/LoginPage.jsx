import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Login from '../Components/forms/Login'

const LoginPage = () => {
  return (
   <div>
    <Navbar/>
    <div className="collection-section">
        <Sidebar/>
        <Login/>
    </div>
   </div>
   
  )
}

export default LoginPage