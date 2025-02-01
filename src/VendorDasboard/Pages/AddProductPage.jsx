import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import AddProduct from '../Components/forms/AddProduct'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AddProductPage = ({showlogOut, logoutHandler}) => {
  const Navigate = useNavigate()
  const loginToken = localStorage.getItem('loginToken')
  return (
    <div>
        <Navbar showlogOut={showlogOut} logoutHandler={logoutHandler}/>
        <div className="collection-section">
            <Sidebar/>
            
            <AddProduct/>
            {/* <AddProduct/> */}
        </div>
    </div>
  )
}

export default AddProductPage