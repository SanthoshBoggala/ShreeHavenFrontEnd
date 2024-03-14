import React, { useContext, useState } from 'react';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import useModifyData from '../customHooks/useModifyData';


const RegisterForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    email: '',
    area: '',
    district: '',
    state: '',
    pincode: '',
    userType: '',
  })
  const [err, setErr] = useState("")
  const {setUser, setToken} = useContext(UserContext)
  const url = 'http://localhost:5000/api/register'
  const { modifyData } = useModifyData({url, method : "POST"})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setErr("")
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const validateForm = ()=>{

    // if(formData.userType.length === 0){
    //   setErr("Invalid user type")
    //   return false
    // }
    // if (formData.password.length < 6) {
    //   setErr("Password must be at least 6 characters long")
    //   return false
    // }
    // if (!isValidEmail(formData.email)) {
    //   setErr("Enter a valid email address")
    //   return false
    // }
    // if(formData.phoneNumber.length !== 10){
    //   setErr("Enter valid phone number")
    //   return false
    // }
    // if (formData.pincode.length !== 6) {
    //   setErr("Enter a valid 6-digit pincode")
    //   return false
    // }

    setErr("")
    return true
  }

  const submitForm = async(e)=>{
    e.preventDefault()

    if(!validateForm()) return

    
    const {isSending, error, data} = await modifyData(formData)

    
    if(error){
      toast.error('Failed to register. Please try again.')
      return
    }

    if (data.msg) {
      setErr(data.msg)
    } else {
      toast.success('Registered successful!')
      setUser(data.user)
      setToken(data.token)
      setTimeout(()=>{
        navigate('/login')
      }, 2000)
      setErr("")
    }
  }
  return (
    <div className="registerForm">
      <form onSubmit={submitForm}>
        <div className='registerHeading'>Register Now</div>
        <div className='row'>
          <div className='col-sm-6 col-8'>
            <div className="">
              <div className='registerCaptions'>User Name:</div>
              <input
                type="text"
                className="registerInputs"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="">
              <div className='registerCaptions'>Password:</div>
              <input
                type="password"
                className="registerInputs"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="">
              <div className='registerCaptions'>Email:</div>
              <input
                type="email"
                className="registerInputs"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="">
              <div className='registerCaptions'>Phone Number:</div>
              <input
                type="tel"
                className="registerInputs"
                placeholder="Phone Number"
                name="phoneNumber"
                max={10}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="">
              <div className='registerCaptions'>Type: </div>
              <select
                className="registerInputs"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
          <div className='col-sm-6 col-8'>
            <div className="">
              <div className='registerCaptions'>Area:</div>
              <input
                type="text"
                className="registerInputs"
                placeholder="Area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <div className='registerCaptions'>District:</div>
              <input
                type="text"
                className="registerInputs"
                placeholder="District"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <div className='registerCaptions'>Pincode:</div>
              <input
                type="tel"
                className="registerInputs"
                placeholder="Pincode"
                name="pincode"
                max={6}
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <div className='registerCaptions'>State:</div>
              <input
                type="text"
                className="registerInputs"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className='error'>
          {err && err}
        </div>
        <div className='registerBtnDiv'>
          <button type="submit" className="registerBtn">
            Sign Up
          </button>
          <div className='loginRegisterDiv'>
            Already have an account ? 
            <span 
              className='loginRegister'
              onClick={()=> navigate('/login')}
            >Login</span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default RegisterForm;
