import './homeTrendingDeals.css'
import ItemCard from '../ItemCard/ItemCard'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { LimitContext } from '../../contexts/LimitContext'
import useFetchData from '../../customHooks/useFetchData'
import ra1 from '../../Images/rightArrow.png'


const HomeTrendingDeals = () => {
  const navigate = useNavigate()
  const { user, token } = useContext(UserContext)
  const {limit} = useContext(LimitContext)

  const url = `http://localhost:5000/api/products/trending_deals`
  const { data: {products}, isLoading, error } = useFetchData({url, query: limit, token})    
  
  const navigateToForYou = () => {
    navigate(`/products/for_you/trending_deals`)
  }
  return (
    <div className='homeTrendingDeals'>
      {isLoading ? (
        <div>
          Loading...
        </div>
      ) : (
        <>
          <div className='headingStyle'>
            <div className='homeHeading'>Trending Deals</div>
            <div className='rightArrow '>
              <img
                onClick={navigateToForYou}
                className='img-fluid'
                src={ra1}
                alt='rightArrow'
              />
            </div>
          </div>
          <div className='trendingDealItems row m-2'>
            { products && products.length !== 0 && (
              products.map( (one, index) => (
                <ItemCard key={index} item={one} />
              ) )
            ) }
          </div>
        </>
      )}
    </div>
  )
}

export default HomeTrendingDeals
