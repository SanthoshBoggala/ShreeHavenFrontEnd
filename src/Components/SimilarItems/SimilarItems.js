import './similarItems.css'
import ItemCard from '../ItemCard/ItemCard'
import React, { useContext } from 'react'
import UserContext from '../../contexts/userContext'
import useFetchData from '../../customHooks/useFetchData'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../contexts/ProductContext'

const SimilarItems = () => {
    const { user, token } = useContext(UserContext)
    const { key } = useContext(ProductContext)

    const url = 'http://localhost:5000/api/products/similar_products'

    const { isLoading, data: { products } , error } = useFetchData({ url, query: key , token });
      
    return (
        <div className='similarItems'>
            <div className='headingStyle'>
                <div className='homeHeading'>Similar Products</div>
            </div>
            <div className='trendingDealItems row m-2'>
                { (products && products.length !== 0) ? (
                    products.map((one, index)=> (
                        <ItemCard key={index} item={one} />
                    ))
                ) : (
                    <h5>No Similar products</h5>
                ) }
            </div>
        </div>
    )
}

export default SimilarItems
