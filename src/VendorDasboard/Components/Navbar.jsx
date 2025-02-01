import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({showlogOut, logoutHandler}) => {
  const firmName = localStorage.getItem('firmName')
  const loginToken = localStorage.getItem('loginToken')
  return (
    <div className='nav-section'>
        <div className="company">
         {!loginToken? <> <Link to='/' className='link'>
            Vendor Dashboard
            </Link></>: <Link to='/Welcome' className='link'>
            Vendor Dashboard
            </Link>}
        </div>
        <div className="firmName">
          <h4>FirmName : { firmName}</h4>
        </div>
        <div className="user-auth">
          {!showlogOut ? <>
          <Link to="/Register" className='link'>  <span>Register  </span></Link>
          <span> / </span>
           <Link to="/Login" className='link' ><span >Login</span></Link>
         </>:  <span onClick={logoutHandler} style={{cursor:'pointer'}}>Logout</span> }

         
          
            
        </div>

    </div>
  )
}

export default Navbar