import React, { useEffect, useState } from 'react'
import { API_URL } from '../Helpers/ApiPath'
import { Audio } from 'react-loader-spinner'

const ShowProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const ApiHandler = async () => {
    setLoading(true) // Start loading
    const firmId = localStorage.getItem('firmId')
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`)
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  useEffect(() => {
    ApiHandler()
  }, [])

  const deleteProduct = async (ProductId) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/product/delete/${ProductId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== ProductId))
        alert("Product deleted successfully")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? 
<div className='loader-section'>
        <Audio
  height="140"
  width="200"
  radius="15"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>

 <p>fetching products from database in process please wait! ...</p>

        </div>
       : !products.length ? (
        <p style={{ marginLeft: '30px', fontSize: "24px", marginTop: "30px" }}>
          No products added
        </p>
      ) : (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productname}</td>
                <td>{item.price}</td>
                <td>{item.image && (
                  <img src={`${API_URL}/uploads/${item.image}`} alt={item.productname} style={{ width: "70px", height: "70px" }} />
                )}</td>
                <td>
                  <button onClick={() => deleteProduct(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ShowProducts
