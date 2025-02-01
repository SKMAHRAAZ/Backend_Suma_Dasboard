import React, { useEffect } from 'react'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import AddProductPage from './AddProductPage'
import AddFirmPage from './AddFirmPage'
import HomePage from './Homepage'
import PrivateRoute from '../PrivateRoute'
import HomePrivateRoute from '../HomePrivateRoute'

import { Routes, Route, Navigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Welcome from './Welcome'
import ShowProductsPage from './ShowProductsPage'
import { useState } from 'react'

const LandingPage = () => {
  const navigate = useNavigate()
  const [showlogOut, setShowlogOut] = useState(true)
  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
    if(!loginToken){
      setShowlogOut(false)
    }
  },[])

  const loginToken = localStorage.getItem('loginToken')
  const firmId = localStorage.getItem('firmId')


  const RequireAuth = (element)=>{
    return loginToken && !firmId ? element : <Navigate to='/'/>
  }

  const RightAuth =(element)=>{
    return !loginToken ? element:<Navigate to='/'/>
  }


  const logoutHandler = ()=>{
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName')
    setShowlogOut(false)
    confirm("Are you sure to log-out")
    navigate('/')
  }


 
  return (
    <div>

      

      <Routes>
        <Route path='/' element={<HomePrivateRoute><HomePage  showlogOut ={showlogOut} logoutHandler ={logoutHandler} /></HomePrivateRoute>}/>
        <Route path='/Register' element= {RightAuth(<RegisterPage/>)}/>
        <Route path='/Login' element = {RightAuth(<LoginPage/>)}/>
      <Route path='/Add-Firm' element={RequireAuth(<AddFirmPage showlogOut ={showlogOut} logoutHandler ={logoutHandler}/>)}/>
      <Route path='/Add-Product' element={<PrivateRoute><AddProductPage showlogOut ={showlogOut} logoutHandler ={logoutHandler}/></PrivateRoute>}/>
        <Route path='/welcome' element={<PrivateRoute><Welcome showlogOut ={showlogOut} logoutHandler ={logoutHandler}/></PrivateRoute>} />
        <Route path='/show-products' element={<PrivateRoute><ShowProductsPage showlogOut ={showlogOut} logoutHandler ={logoutHandler}/></PrivateRoute>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>

        
    </div>
  )
}

export default LandingPage