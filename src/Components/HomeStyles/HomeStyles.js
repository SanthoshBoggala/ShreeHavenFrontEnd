import React from 'react'
import './homeStyles.css'
import StyleComponent from './StyleComponent'
import tShirts from '../../Images/t-shirts.webp'
import winterWear from '../../Images/winterWear.png'
import mobiles from '../../Images/mobiles.jpg'
import sarees from '../../Images/sarees.jpg'
import watches from '../../Images/watches.jpg'
import formalShirts from '../../Images/formal-shirts.jpeg'

const HomeStyles = () => {
  const styleData = [
    {
      image: tShirts,
      name: 'T-Shirts'
    },
    {
      image: winterWear,
      name: 'Winter Wear'
    },
    {
      image: mobiles,
      name: 'Mobiles'
    },
    {
      image: sarees,
      name: 'Sarees'
    },
    {
      image: watches,
      name: 'Watches'
    },
    {
      image: formalShirts,
      name: 'Formal-Shirts'
    }
  ]
  return (
    <div className='homeStyles'>
      <div className='homeHeading'>Explore Our Products</div>
      <div className='row homeStylesData'>
        {(styleData && styleData.length !==0 ) ? 
          styleData.map((oneCategory)=> <StyleComponent  key={oneCategory.name} {...oneCategory} />) : (
            <h4>No Categories Available</h4>
          )
        }
      </div>
    </div>
  )
}

export default HomeStyles
