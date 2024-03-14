import React, { useContext, useState } from 'react'
import './loginPage.css'
import email from '../Images/email.png'
import pass from '../Images/pass.png'
import userType from '../Images/type.png'
import UserContext from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import useModifyData from '../customHooks/useModifyData'

const LoginForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    userType: '',
  })
  const [err, setErr] = useState("")
  const { setUser, setToken } = useContext(UserContext)
  const url = 'http://localhost:5000/api/login'
  const { modifyData } = useModifyData({ url, method : "POST"})
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setErr("")
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = ()=>{

    // if (formData.password.length < 6) {
    //   setErr("Password must be at least 6 characters long")
    //   return false
    // }
    if (!isValidEmail(formData.email)) {
      setErr("Enter a valid email address")
      return false
    }

    if(formData.userType.length === 0) {
      setErr("Select a user type")
      return false
    }

    setErr("")
    return true
  }
  async function submitForm(e){
    e.preventDefault()

    if(!validateForm()){
      return
    }

    const {isSending, error, data} = await modifyData(formData)

    if(error){
      toast.error('Invalid credentials. Please try again.')
      return
    }

    if(data.msg){
      setErr(data.msg)
    }
    else if(data){
      toast.success('Login successful!')
      setUser(data.user)
      setToken(data.token)
      setTimeout(()=>{
        navigate("/")
      }, 1500)      
      setErr("")
    }

  }

  return (
    <div className="loginForm">
      <form onSubmit={submitForm}>
        <div className='loginHeading'>Login</div>
        
        <div className="mb-3">
          <img 
            src={email}
            alt='email'
          />
          <input
            type="email"
            className="loginInputs"
            id="email"
            placeholder='email'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <img 
            src={pass}
            alt='password'
          />
          <input
            type="password"
            className="loginInputs"
            id="password"
            name="password"
            placeholder='password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <img 
            src={userType}
            alt='type'
          />
          <select
            className="loginInputs"
            id="type"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
          >
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <div className='forgotPass'>
            Forgot Password ?
          </div>
          <div className='error'>
            {err && err}
          </div>
        </div>
        <div className='loginBtnDiv'>
          <button type="submit" className="loginBtn">
            Login
          </button>
          <div className='loginRegisterDiv'>
            Don't have an account ? 
            <span 
              className='loginRegister'
              onClick={()=> navigate('/register')}
            >
              Sign Up
            </span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default LoginForm
