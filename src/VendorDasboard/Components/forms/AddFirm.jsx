import React, { useState } from 'react'
import { API_URL } from '../../Helpers/ApiPath'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
const AddFirm = () => {

    const Navigate = useNavigate()

    const [firmname, setFirmname] = useState("")
    const [area, setArea] = useState("")
    const[category, setCategory] = useState([])
    const[region,setRegion] = useState([])
    const[offer,setOffer] = useState("")
    const[file,setFile] = useState(null)
    const [loading, setLoading] = useState(false)




    const regionHandler = (e)=>{
        const value = e.target.value
        if(region.includes(value)){
            setRegion(region.filter((item)=>item!==value))
        }else{
            setRegion([...region,value])
        }
    }


    const categoryHandler =(e)=>{
        const value = e.target.value
        if(category.includes(value)){
            setCategory(category.filter((item)=>item!==value))

        }else{
            setCategory([...category, value])
        }
    }


const submitHandler = async(e)=>{
    e.preventDefault()
    setLoading(true)

try {

    const loginToken = localStorage.getItem('loginToken')
    if(!loginToken){
        console.log("user not authenticated")
       
    }console.log(loginToken)

    const formData = new FormData()
    formData.append('firmname', firmname)
    formData.append('area',area)
    formData.append('offer',offer)
    formData.append('image',file)
    category.forEach((item)=>{
        formData.append('category', item)
    })
    region.forEach((item)=>{
        formData.append('region', item)
    })

    const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:"POST",
        headers:{
            'token':`${loginToken}`
        },
        body:formData
    })

    const data = await response.json()
    const mango = data.firmId;
    const vendorRestuarant = data.vendorFirmName
    if(response.ok){
        alert("firm added sucessfully")
        // localStorage.setItem('firmId', data.firmId)
        
        setFirmname("")
        setArea("")
        setRegion([])
        setCategory([])
        setOffer([])
        setFile("")
        
    localStorage.setItem('firmId', mango);
    localStorage.setItem('firmName', vendorRestuarant)
    
    window.location.reload()
    }else if(data.message === "vendor should have only firm"){
        alert("firm exists. only one firm can be added")
        window.location.reload()
       
    }else{
        alert("failed to add firm")
    }

   

    
} catch (error) {

    console.log(error)
    alert('failed to add firm')
    
}

}






  return (

    
    <div className="form-container-Addfirm">

        {loading && <div className='loader-section'>
            <Audio
  height="140"
  width="200"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>

<p>Adding firm please wait!...</p>
</div>}
        
       {!loading &&  <form onSubmit={submitHandler}>
        <h1>Add Firm</h1>
            <div classNameName="form-group">
                <label >Firm Name</label>
                <input type="text"  name="firmname" value={firmname} onChange={(e)=>setFirmname(e.target.value)} placeholder="Enter firm name" required/>
            </div>

            <div className="form-group">
                <label >Area</label>
                <input type="text" id="Area" name="Area"  value={area} onChange={(e)=>setArea(e.target.value)} placeholder="Enter the Area" required/>
            </div>

            <div className="form-group">
                <label>Category</label>
                <div class="checkbox-group">
                    <label><input type="checkbox"   name="category" checked={category.includes('veg')} onChange={categoryHandler} value='veg'/> Veg</label>
                    <label><input type="checkbox"  name="category" checked={category.includes('non-veg')} onChange={categoryHandler} value='non-veg'/> Non-Veg</label>
                </div>
            </div>

            <div className="form-group">
                <label>Region</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" checked={region.includes('south-indian')} onChange={regionHandler} value="south-indian"/> South Indian</label>
                    <label><input type="checkbox" checked={region.includes('north-indian')} onChange={regionHandler} value="north-indian"/> North Indian</label>
                    <label><input type="checkbox" checked={region.includes('chinese')} onChange={regionHandler}  value="chinese"/> Chinese</label>
                    <label><input type="checkbox" checked={region.includes('bakery')} onChange={regionHandler} value="bakery"/> bakery</label>
                </div>
            </div>

            <div className="form-group">
                <label >Offer</label>
                <input type="text" id="offer"  name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)} placeholder="Enter offer details"/>
            </div>

            <div className="form-group">
                <label>Image</label>
                <input type="file" id="image" name="image" onChange={(e)=>setFile(e.target.files[0])}  required/>
            
            </div>
            <button type="submit" className="btn">Add Firm</button>
        </form>}
    </div>
  )
}

export default AddFirm