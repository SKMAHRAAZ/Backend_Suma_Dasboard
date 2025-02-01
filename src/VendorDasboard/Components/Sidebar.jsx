import React from 'react'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const firmID = localStorage.getItem('firmId')
  const navigate = useNavigate()
  const loginToken = localStorage.getItem("loginToken");


  const handleAddProduct = () => {
   
    if (!loginToken) {
      alert("Please login");
      navigate("/"); // Redirect to homepage
    } else {
      navigate("/Add-Product"); // Navigate to Add Product page if logged in
    }
  };

  const handleFirm = () => {
    

    if (!loginToken) {
      alert("Please login");
      navigate("/"); // Redirect to homepage
    } else {
      navigate("/Add-Firm"); // Navigate to Add Product page if logged in
    }
  };

  const handleAllProduct = () => {
    

    if (!loginToken) {
      alert("Please login");
      navigate("/"); // Redirect to homepage
    } else {
      navigate("/show-products"); // Navigate to Add Product page if logged in
    }
  };




  return (
    <div className='side-section'>
        <div className="side-list">
            <ul>
             {!firmID ? 
              <li onClick={handleFirm} style={{cursor:"pointer"}}>Add Firm</li> : null
              
              }
              
                {/* <Link to='/Add-Product' className='link'> */}
                <li onClick={handleAddProduct} style={{cursor:'pointer'}}>Add Product</li>
                
                
               
               <li onClick={handleAllProduct} style={{cursor:"pointer"}}>All Products</li>
               
                
                <li>User Details</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar