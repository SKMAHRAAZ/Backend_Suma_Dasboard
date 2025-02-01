import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import AddFirm from '../Components/forms/AddFirm'
import { useNavigate } from 'react-router-dom'

const AddFirmPage = ({showlogOut, logoutHandler}) => {
  const Navigate = useNavigate()
  const loginToken = localStorage.getItem('loginToken')

 
  return (
    <div>
        <Navbar showlogOut={showlogOut} logoutHandler={logoutHandler}/>
        <div className="collection-section">
            <Sidebar/>
            {loginToken ? <AddFirm/>:alert("please login")}


            {/* <AddFirm/> */}
        </div>
    </div>
  )
}

export default AddFirmPage