import { useNavigate } from 'react-router-dom'
import './homeStyles.css'
import React from 'react'

const StyleComponent = ({name, image}) => {
    const navigate = useNavigate()

    const navigateToStyles = ()=>{
      navigate(`/products/styles/${name}`)
    }
    return (
        <div className='style col-lg-2 col-md-3 col-sm-4 col-6 g-3'>
            <div className='styleImg'>
                <img
                    onClick={navigateToStyles}
                    src={image}
                    alt='stylesImg'
                    className='img-fluid'
                />
            </div>
            <div className='styleName'>
                {name}
            </div>
        </div>
    )
}

export default StyleComponent
