import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Welcome = ({showlogOut, logoutHandler}) => {
  const firmname = localStorage.getItem('firmName')
  return (
    <div>
        <Navbar showlogOut={showlogOut} logoutHandler={logoutHandler}/>
        <div className="collection-section">
            <Sidebar/>
            
            <div className="wel">
            <h1 style={{marginLeft:"32.5%", marginTop:"40px", color:'blue'}}>Welcome {firmname} </h1>
            <div className="img-section">
            <img src="/Assets/chef.jpg" alt="" srcset="" />
            </div>
           
           
           
            </div>
            
        </div>
    </div>
  )
}

export default Welcome