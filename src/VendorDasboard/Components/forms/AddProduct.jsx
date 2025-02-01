import React, { useState } from 'react'
import { API_URL } from '../../Helpers/ApiPath'
import { Audio } from 'react-loader-spinner'
const AddProduct = () => {
    const [productname, setProductname] = useState("")
    const[price, setPrice] = useState("")
    const[category, setCategory] = useState([])
    const[bestSeller,setBestSeller] = useState(false)
    const[description,setDescription] = useState("")
    const [file,setFile] = useState(null)
    const[loading, setLoading] = useState(false)



    const categoryHandler =(event)=>{

        const value = event.target.value
        if(category.includes(value)){
            setCategory(category.filter((item)=>item!==value))
        }else{
            setCategory([...category,value])
        }
    }

    const bestSellerHandler = (e)=>{
        const value = e.target.value === 'true'
        setBestSeller(value)
    }
    

    const submitHandler = async(e)=>{
        e.preventDefault()
        setLoading(true)

       try {


        const firmId = localStorage.getItem('firmId')
        const token = localStorage.getItem('loginToken')
        if(!token || firmId){
            console.log("user not authenticated")
        }
        console.log(firmId)

    


        const formData = new FormData()
        formData.append('productname', productname)
        formData.append('price', price)
        formData.append('image',file)
        formData.append('bestSeller',bestSeller)
        category.forEach((item)=>{
            formData.append('category',item)
        })
        formData.append('description',description)



        const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
            method:"POST",
            body:formData
            
        })

        const data = await response.json()
        if(response.ok){
            alert("product added successfully")
            setPrice("")
            setProductname("")
            setCategory([])
            setBestSeller(false)
            setDescription("")
            setFile("")
           
        }
        window.location.reload()

        
       } catch (error) {

        console.log(error)
        alert("failed to add product")
        
       }











    }
    















  return(

    
   
    <div className="form-container-Addproduct">
        {loading && <div className='loader-sction'>
             <Audio
              height="140"
              width="200"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
            <p>Adding Product please wait ....</p>
            </div>}


            {!loading &&  <form onSubmit={submitHandler}>
        <h1>Add Product</h1>
            <div className="form-group">
                <label >Product Name</label>
                <input type="text" id="productname" name="productname" value={productname} onChange={(e)=>setProductname(e.target.value)} placeholder="Enter product name" required/>
            </div>

            <div className="form-group">
                <label >Price</label>
                <input type="text" id="price" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter price" required/>
            </div>

            <div className="form-group">
                <label>Category</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="category" checked={category.includes('veg')}  onChange={categoryHandler} value="veg"/> Veg</label>
                    <label><input type="checkbox" name="category" checked={category.includes('non-veg')} onChange={categoryHandler} value="non-veg"/> Non-Veg</label>
                </div>
            </div>

            <div className="form-group">
                <label>Best Seller</label>
                <div class="checkbox-group">
                    <label><input type="radio" name="bestseller" checked={bestSeller===true} onChange={bestSellerHandler} value="true"/> Yes</label>
                    <label><input type="radio" name="bestseller" checked={bestSeller===false} onChange={bestSellerHandler} value="false"/> No</label>
                </div>
            </div>

            <div className="form-group">
                <label>Description</label>
                <input type="text" id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter product description"/>
            </div>

            <div className="form-group">
                <label >Image</label>
                <input type="file" id="image" onChange={(e)=>setFile(e.target.files[0])} name="image" required/>
            </div>

            <button type="submit" className="btn">Add Product</button>
        </form>}
       
       
    </div>
  )
}

export default AddProduct