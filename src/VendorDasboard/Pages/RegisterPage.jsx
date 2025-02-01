import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import RegisterForm from '../Components/forms/RegisterForm'
import Register from '../Components/forms/register'


const RegisterPage = () => {
  return (
    <div>
        <Navbar/>
        <div className="collection-section">
            <Sidebar/>
            <RegisterForm/>
            {/* <Register/> */}
            
        </div>
    </div>
  )
}

export default RegisterPage