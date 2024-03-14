import React, { useContext, useState } from "react"
import './products.css'
import ItemCard from "../ItemCard/ItemCard"
import { useParams } from "react-router-dom"
import UserContext from '../../contexts/userContext'
import { SelectedFilters } from "../../contexts/SelectedFilters"
import useFetchData from "../../customHooks/useFetchData"

const Products = ({ urlEndPoint, topRatedUrl = "", stylesForYouPage = false, topRated = false }) => {
    const [search, setSearch] = useState("")
    const [urlSearch, setUrlSearch] = useState("")
    const { token } = useContext(UserContext)

    const { filters } = useContext(SelectedFilters)
    const { category } = useParams()

    let url
    if(category){
        url = `http://localhost:5000/api/products?type=${category}&search=${urlSearch}`
    }
    else if( topRatedUrl.length !== 0 ){
        url = `http://localhost:5000/api/products/top_rated?category=${topRatedUrl}&search=${urlSearch}`
    }
    else if(['trending_deals', 'hot_deals'].includes(urlEndPoint)){
        url = `http://localhost:5000/api/products/${urlEndPoint}?search=${urlSearch}`
    }
    else if(urlEndPoint !== 'suggested_items') {
        url = `http://localhost:5000/api/products/styles/${urlEndPoint}?search=${urlSearch}`
    }
    else{
        url = `http://localhost:5000/api/products?search=${urlSearch}`   
    }
    const { data: { products }, isLoading, error } = useFetchData({ url, query: filters, token })

    // const { loading, data: {products}, error } = useGetData(url, filters, token);

    // useEffect(() => {
    //     async function getProducts() {
    //         const products = await axios.get(`http://localhost:5000/api/products?type=${category}`, {
    //             headers: {
    //                 authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMyZmNjNTczZDg2MjQyYTU0ZTIzNGUiLCJlbWFpbCI6InNAZ21haWwuY29tIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzA4NTIwNTU0LCJleHAiOjE3MDg1NTY1NTR9.3t5fPvXA3A0jHXf67fsx7pQszT-jjjlVKocjc5sKfJA'
    //             }
    //         })

    //         setProducts(products.data.products)
    //     }
    //     try {
    //         getProducts()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [category, rating, filter])

    // const Details = {
    //     "productKey": "Men_striped_casual_light_green_white_shirt",
    //     "name": "Men striped casual light green white shirt",
    //     "brand": "U TURN",
    //     "category": "Shirts",
    //     "price": 369,
    //     "newPrice": 313,
    //     "discount": 15,
    //     "starRating": 4,
    //     "ratings": 30059,
    //     "reviews": 3599,
    //     "description": "Explore style with this men's striped casual light green and white shirt by U TURN. This shirt is perfect for a casual and trendy look.",
    //     "image": "https://drive.google.com/uc?id=1TlgCuWATQr43Lxhn33i7DKgFeggLn9Al"
    // }

    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 87, 43]
    // const productDetails = arr.map(() => Details)


    const searchChange = (e) => {
        setSearch(e.target.value)
    }
    const searchItems = ()=>{
        setUrlSearch(search)
    }
    return (
        <div className='products'>
            {isLoading ? <h4>Loading</h4> : (
                <div className={category ? 'productsTop' : 'noProductsTop' } >
                    <div className="productsCount">
                        {`View (${products ? products.length : 0}) products`}
                    </div>
                    <div className="productSearch">
                        <input
                            type="text"
                            name='search'
                            value={search}
                            placeholder="search"
                            onChange={searchChange}
                        />
                        <button 
                            className="searchBtn"
                            onClick={searchItems}
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}

            {(products && products.length !== 0) ? (
                <>
                    <div className="row">
                        {products.map((item, index) => {
                            return (
                                <ItemCard key={index} item={item} notProducts={(stylesForYouPage || topRated)} />
                            )
                        })
                        }
                    </div>
                </>

            ) : (
                <h4 className="productsTop">
                    No Products Available right now...
                </h4>
            )}

        </div>
    )
}

export default Products