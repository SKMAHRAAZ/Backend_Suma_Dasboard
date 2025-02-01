import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import ShowProducts from '../Components/ShowProducts'

const ShowProductsPage = ({showlogOut, logoutHandler}) => {

  return (
    <div>
        <Navbar showlogOut={showlogOut} logoutHandler={logoutHandler}/>
        <div className="collection-section">
            <Sidebar/>
           <ShowProducts/>
        </div>
    </div>
  )
}

export default ShowProductsPage