import React, { useEffect, useState } from 'react'
import { API_URL } from '../Helpers/ApiPath'

const ShowProducts = () => {
    const [products, setProducts] = useState([])

    const ApiHandler = async()=>{

       const firmId = localStorage.getItem('firmId')
       try {

        const response = await fetch(`${API_URL}/product/${firmId}/products`)

        const data = await response.json()

        setProducts(data.products)
        
       } catch (error) {
        console.log(error)
        
       }
    }

    useEffect(()=>{
      ApiHandler()
    },[])



    const deleteProduct = async(ProductId)=>{
      const response = await fetch(`${API_URL}/product/delete/${ProductId}`,{
        method:'DELETE'
      })
      if(response.ok){
        setProducts(products.filter((product)=>product._id!== ProductId))
        confirm("are you sure ? You want to delete this item ")
        alert("product deleted successfully")
      }
    }


  return (
    <div>

      {!products?(<p style={{marginLeft:'30px', fontSize:"24px", marginTop:"30px"}}>
        No products Added
      </p>):(<table className='product-table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item)=>{
            return(
              <>

              <tr key={item._id}>
                <td>{item.productname}</td>
                <td>{item.price}</td>
                <td>{item.image && (<img src={`${API_URL}/uploads/${item.image}`} alt={item.productname}  style={{width:"70px", height:"70px"}}/>)}</td>
                <td><button onClick={()=>deleteProduct(item._id)} >Delete</button></td>
              </tr>
              



              </>
            )

          })}
          
            
          
        </tbody>

            </table>)}


    </div>
  )
}

export default ShowProducts