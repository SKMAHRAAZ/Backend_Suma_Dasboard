import React, { useState } from 'react'
import { API_URL } from '../../Helpers/ApiPath'
import { useNavigate } from 'react-router-dom'
import { Audio, ThreeCircles } from 'react-loader-spinner'


const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[loading, setLoading] = useState(false)
  const[showPassword, setShowPassword] = useState(false)
  
      const passwordHandler = ()=>{
          setShowPassword(!showPassword)
      }


  const HandleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)

    try {

      const response = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      })

      const data = await response.json()
      if(response.ok){
        alert("login success")
        localStorage.setItem('loginToken',data.token)
        setEmail("")
        setPassword("")
        navigate('/welcome')
      }
      const vendorId = data.vendorId
      console.log(`checking for vendorId: ${vendorId}`)

      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      window.location.reload()
      const vendorData = await vendorResponse.json()
      console.log(vendorData)
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId
        const vendorFirmname = vendorData.vendorFirmName
        console.log(`checking for firmId: ${vendorFirmId}`)
        localStorage.setItem('firmId',vendorFirmId)
        localStorage.setItem('firmName', vendorFirmname)
      }
      
    } catch (error) {
      alert('login failed')
      console.log(error)
      
    }


  }
  return (
 
<div className="form-container-login">
   
      {loading && <div className='loader-section'>
        <Audio
  height="140"
  width="200"
  radius="15"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>

 <p>Login in process please wait</p>

        </div>}

        {!loading &&  
    <form onSubmit={HandleSubmit}>
       <h1>Login</h1>
        <div className="form-group">
            <label >Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required/>
        </div>
        <div className="form-group">
            <label >Password</label>
            <input type={showPassword ? "text":"password"} id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required/>
            <span className='show-password-login' onClick={passwordHandler}>{showPassword?"Hide":"Show"}</span>
        </div>
        <button type="submit" class="btn">Login</button>
    </form>  }
    

</div>




  )
}

export default Login