import React from 'react'
import './topRatedPage.css'
import { useParams } from 'react-router-dom'
import { Products } from '../Components'

const TopRatedPage = () => {
  const { id } = useParams()
  return (
    <div className='topRatedPage row'>
      <Products topRated = {true} topRatedUrl={id}/>
    </div>
  )
}

export default TopRatedPage
