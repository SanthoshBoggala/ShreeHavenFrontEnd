import React, { useContext, useEffect } from "react"
import './singleProductPage.css'
import { Reviews, SimilarItems } from "../Components"
import SingleProductImages from "./SingleProductImages"
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../contexts/userContext"
import { toast, ToastContainer } from 'react-toastify'
import { ProductContext } from '../contexts/ProductContext'
import useFetchData from "../customHooks/useFetchData"
import useModifyData from "../customHooks/useModifyData"
import RefetchProductContext from "../contexts/RefetchProductContext"
import { FashionDataContext } from "../contexts/FashionDataContext"
import NotFoundAndUnAuthorized from "../Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized"

const SingleProductPage = () => {
    const { user, token } = useContext(UserContext)
    const { refetch } = useContext(RefetchProductContext)
    const { fashionData } = useContext(FashionDataContext)
    const { id } = useParams()
    const navigate = useNavigate()


    let url = `http://localhost:5000/api/products/${id}`
    const { data: { product }, isLoading, error } = useFetchData({ url, query: refetch, token })
    url = 'http://localhost:5000/api/cart'
    const { modifyData } = useModifyData({ url, token })

    const { setKey } = useContext(ProductContext)

    useEffect(() => {
        setKey({ key: id })
    }, [id])

    if(!isLoading && !product){
        return (
            <NotFoundAndUnAuthorized type={'notFound'}/>
        )
    }




    if (product) {
        fashionData.forEach(one => {
            if (one.category == product.category) {
                product['colors'] = one.colors
                product['sizes'] = one.sizes
            }
        })
    }

    const addToCart = async () => {

        const { isSending, error, data } = await modifyData({ key: product.key })

        if (error) {
            toast.error('Failed to add cart!')
        }
        else {
            toast.success('Added to cart Successfully!')
        }
    }

    const goToBuyPage = () => {
        if (!Boolean(product.inStock)) {
            toast.error('Sorry! Not available right now...')
            return
        }
        const currentUrl = window.location.pathname
        navigate(`${currentUrl}/buy`)
        return
    }

    const gotoEditProduct = () => {
        const currentUrl = window.location.pathname
        navigate(`${currentUrl}/edit`)
        return
    }

    const goToLogin = () => {
        navigate('/login')
        return
    }


    return (
        <>
            {isLoading ? (
                <div className="productPage">
                    Loading...
                </div>
            ) : (
                (product && (
                    <>
                        <div className="productPage">
                            <div className="row singleProductPage">
                                <div className="col-lg-6 productImageDiv">
                                    <div className="row productImage">
                                        <SingleProductImages images={product.images} />
                                    </div>
                                </div>
                                <div className="col-lg-6 productDetails" >
                                    <div className="productBrand">
                                        {product.brand}
                                    </div>
                                    <div className="productName">
                                        {product.name}
                                    </div>
                                    <div className="productSpecialPrice">
                                        Special Price
                                    </div>
                                    <div className="productPrice">
                                        <div className="productNPrice">{"₹" + product.newPrice}</div>
                                        <div className="productOPrice">{product.price}</div>
                                        <div className="productDiscount">{product.discount + '% off'}</div>
                                    </div>
                                    <div className="productRatings">
                                        <span class="badge bg-primary productStarRating">{product.starRating + '★'}</span>
                                        <span className="productRatings">{product.ratings + ' Ratings'}</span>
                                        <span className="productRatings">and</span>
                                        <span className="productReviews">{product.reviews.length + ' Reviews'}</span>
                                    </div>
                                    { !['Watches','Sarees'].includes(product.category) && (
                                        <>
                                            <div className="productColors">
                                                <span className="someHeadings">Available colors</span> <br />
                                                {product.colors.map((x) => {
                                                    return (
                                                        <span className="badge bg-secondary sizeOptions" key={x}>{x}</span>
                                                    )
                                                })}
                                            </div>
                                            <div className="productSizes">
                                                <span className="someHeadings">Available sizes</span> <br />
                                                { product.sizes.map((x) => {
                                                    return (
                                                        <span className="badge bg-secondary sizeOptions" key={x}>{x}</span>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    )}
                                    <div className="productDescription">
                                        <span className="someHeadings">Description</span> <br />
                                        <div className="innerDescription">{product.description}</div>
                                    </div>
                                    <div className="productOffers">
                                        <div>
                                            <span className="someHeadings">Available offers</span> <br />
                                        </div>
                                        <div>
                                            <img
                                                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                                                alt="offertag"
                                                className="offerTag"
                                            />
                                            Bank Offer10% off on Bank of Baroda Credit Card EMI Txns, up to ₹2,000 on orders of ₹10,000 and above <span className="termsConditions">T&C</span>
                                        </div>
                                        <div>
                                            <img
                                                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                                                alt="offertag"
                                                className="offerTag"
                                            />
                                            Bank Offer10% off on IDFC FIRST Bank Credit Card EMI Transactions, up to ₹1,750 on orders of ₹10,000 and above <span className="termsConditions">T&C</span>
                                        </div>
                                        <div>
                                            <img
                                                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                                                alt="offertag"
                                                className="offerTag"
                                            />
                                            Special PriceGet at flat ₹389 <span className="termsConditions">T&C</span>
                                        </div>
                                        <div className="termsConditions">
                                            View 9 more offers
                                        </div>
                                        <ToastContainer />
                                    </div>
                                    <div className="productBts">
                                        {(user && user.type) ? (
                                            (user.type && user.type === 'customer') ? (
                                                <>
                                                    <div>
                                                        <button
                                                            className="AddToCartBtn"
                                                            onClick={addToCart}
                                                        >
                                                            Add To Cart
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="buyBtn"
                                                            onClick={goToBuyPage}
                                                        >
                                                            {Boolean(product.inStock) ? 'Buy Now' : 'Not Available'}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <button
                                                        className="buyBtn"
                                                        onClick={gotoEditProduct}
                                                    >
                                                        Edit Now
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            <h3>
                                                <button className="gotToLogin" onClick={goToLogin}>Login </button> To Proceed
                                            </h3>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Reviews
                                ratings={product.ratings}
                                starRating={product.starRating}
                                reviews={product.reviews}
                            />

                            <SimilarItems />
                        </div>
                    </>
                ))
            )}
        </>
    )
}

export default SingleProductPage