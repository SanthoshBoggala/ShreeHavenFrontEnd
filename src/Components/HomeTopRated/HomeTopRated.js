import './homeTopRated.css'
import React, { useContext } from 'react'
import ItemCard from '../ItemCard/ItemCard'
import UserContext from '../../contexts/userContext'
import { LimitContext } from '../../contexts/LimitContext'
import useFetchData from '../../customHooks/useFetchData'

const HomeTopRated = () => {

    const { user, token } = useContext(UserContext)
    const {limit} = useContext(LimitContext)

    const url = `http://localhost:5000/api/products/top_rated`
    const { data: {products, cateCaptions}, isLoading, error } = useFetchData({url, query: limit, token})    
      
    return (
        <div className='homeTopRated'>
            <div className='homeHeading'>Top Rated Products</div>
            {(isLoading || error) ? (
                <div className='m-3'>
                    { isLoading ? 'Loading...' : 'Error in loading'}
                </div>
            )
                : (
                    <div className='homeTopRatedItems row m-2'>
                        {products && products.length !== 0 && (
                            products.map((one, index) => (
                                <ItemCard key={index} item={one} caption={cateCaptions[index]} topRated={true} />
                            ))
                        )}
                    </div>
                )}
        </div>
    )
}

export default HomeTopRated
