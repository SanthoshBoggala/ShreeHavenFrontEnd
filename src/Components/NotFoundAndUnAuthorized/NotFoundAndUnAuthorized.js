import React from 'react'
import page401 from '../../Images/401UnAuthorized.png'
import page404 from '../../Images/404NotFound.webp'
import './notFoundAndUnAuthorized.css'

const NotFoundAndUnAuthorized = ({type}) => {
  return (
    <div className='notFoundAndUnAuthorized'>
        <img 
            src= { type === "notFound" ? page404 : page401}
            className='img-fluid'
            alt={'notFoundAndUnAuthorized'}
        />
    </div>
  )
}

export default NotFoundAndUnAuthorized
