import React, { useState } from 'react'
import { API_URL } from '../../Helpers/ApiPath'
import { useNavigate } from 'react-router-dom'
import { ThreeCircles ,Audio} from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

const RegisterForm = () => {
    const navigate = useNavigate()
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")
    const[loading,setLoading] = useState(false)
    const[showPassword, setShowPassword] = useState(false)

    const passwordHandler = ()=>{
        setShowPassword(!showPassword)
    }

    

    const HandleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/vendor/register`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({username,email,password})
            })

            const data = await response.json()
            if(response.ok){
                console.log(data)
                alert("vendor registered successfully")
                // register()
                setUsername("")
                setEmail("")
                setPassword("")

                navigate('/Login')
            }
            
        } catch (error) {

            console.log("Registration Failed", error)
            alert("Registration Failed")
            
        }
    }
  return (
    <div className="form-container">
        <ToastContainer/>

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

            <p>Register in process please wait</p>
            </div>}
   
    {!loading && <form onSubmit={HandleSubmit}>
      <h1>Register</h1>
        <div className="form-group">
            <label >Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your username" required/>
        </div>
        <div className="form-group">
            <label >Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required/>
        </div>
        <div className="form-group">
            <label >Password</label>
            <input type={showPassword ? "text":"password"} id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required/>
            <span className='show-password-register' onClick={passwordHandler}>{showPassword?"Hide":"Show"}</span>
        </div>
        <button type="submit" className="btn">Register</button>
    </form>}
</div>
  )
}

export default RegisterForm