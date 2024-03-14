import React, { useContext, useState } from 'react';
import './personalInfo.css';
import UserContext from '../../contexts/userContext';
import userIcon from '../../Images/username.png'

const PersonalInfo = () => {
  const { user: userDetails } = useContext(UserContext)
  const initialUser = {
    username: userDetails.username,
    email: userDetails.email
  };

  userDetails.addresses.forEach((one,index) => {
    initialUser[`address${index + 1}`] = one.address
  })


  const [user, setUser] = useState(initialUser);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  return (
    <div className='personalInfo row'>
      <form className='col-10 col-md-8'>
        <fieldset className='formInfo'>
          <div className='image'>
            <div className='userImg'>
              <img
                src={userIcon}
                alt='profilepic'
                className='img-fluid'
              />
            </div>
          </div>
          <legend>Personal Information:</legend>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              className='profileInput'
              type='text'
              id='username'
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={user.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div>
            <label htmlFor='area'>Address1:</label>
            <input
              type='text'
              id='address1'
              value={user.address1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button
              className='updateBtn'
            >
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PersonalInfo;
