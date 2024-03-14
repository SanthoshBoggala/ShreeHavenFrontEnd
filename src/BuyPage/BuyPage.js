import React, { useContext, useEffect, useState } from 'react'
import './buyPage.css'
import { SimilarItems } from '../Components';
import MyModal from './Model';
import { useParams } from 'react-router-dom';
import useFetchData from '../customHooks/useFetchData';
import { LimitContext } from '../contexts/LimitContext';
import UserContext from '../contexts/userContext';
import { FashionDataContext } from '../contexts/FashionDataContext'


const BuyPage = () => {

    const { id } = useParams()
    const { token } = useContext(UserContext)
    const { limit } = useContext(LimitContext)
    const { fashionData } = useContext(FashionDataContext)

    let url = `http://localhost:5000/api/products/${id}`
    const { data: { product }, isLoading, error } = useFetchData({ url, query: limit, token })

    // const product = {
    //     "productKey": "Men_striped_casual_light_green_white_shirt",
    //     "name": "Men striped casual light green white shirt",
    //     "brand": "U TURN",
    //     "category": "Shirts",
    //     "price": 369,
    //     "newPrice": 313,
    //     "discount": 15,
    //     "starRating": 4.5,
    //     "ratings": 30059,
    //     "reviews": 3599,
    // }
    const [viewModel, setViewModel] = useState(false)
    const [extra, setExtra] = useState({
        count: 1,
        color: '',
        size: '',
    })
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (product) {
            setTotalPrice(product.newPrice)
        }
    }, [product])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'count') {
            if (value !== '' && Number(value) < 1) {
                setExtra(prevExtra => ({ ...prevExtra, count: '1', totalPrice: product.newPrice }))
                setTotalPrice(product.newPrice)
            }
            else {
                setExtra(prevExtra => ({
                    ...prevExtra,
                    [name]: value,
                }))
                setTotalPrice(Number(value) * Number(product.newPrice))
            }
        }
        else {
            setExtra(prevExtra => ({
                ...prevExtra,
                [name]: value,
            }))
        }
    }

    if (product) {
        fashionData.forEach(one => {
            if (one.category === product.category) {
                product['colors'] = one.colors
                product['sizes'] = one.sizes
            }
        })
    }

    const setViewModelHelpher = () => {
        setViewModel(prev => !prev)
    }
    return (
        <>
            {product ? (
                <>
                    <div className="buyPage row g-3">
                        <div className="productBuyDetails col-md-6">
                            <div className="productBrand">
                                {product.brand}
                            </div>
                            <div className="productName">
                                {product.name}
                            </div>
                            <div className="productPrice">
                                <div className="productNPrice">{"₹" + product.newPrice}</div>
                                <div className="productOPrice">{product.price}</div>
                                <div className="productDiscount">{product.discount + '% off'}</div>
                            </div>
                            { !['Watches' , 'Sarees'].includes(product.category) && (
                                <>
                                    <div className='buyExtra extras'>
                                        Color:
                                        <select
                                            name='color'
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Color</option>
                                            {product.colors && (
                                                product.colors.map((x, index) => {
                                                    return (<option key={index} value={x}>{x}</option>)
                                                })
                                            )}
                                        </select>
                                    </div> <br />
                                    <div className='buyExtra'>
                                        Size:
                                        <select
                                            name='size'
                                            onChange={handleChange}
                                        >
                                            <option value="">Select sizes</option>
                                            {product.sizes && (
                                                product.sizes.map((x, index) => {
                                                    return (<option key={index} value={x}>{x}</option>)
                                                })
                                            )}
                                        </select>
                                    </div>
                                </>
                            )}
                            <br />
                            <div className='buyExtra'>
                                Qty:
                                <input
                                    className='count'
                                    type="number"
                                    name={'count'}
                                    onChange={handleChange}
                                    value={extra.count}
                                    min={1}
                                />
                            </div>
                            <div className='totalPrice'>
                                Total Price: <span>{totalPrice}</span>
                            </div>
                            <div className='buyPageBtn'>
                                <button
                                    className="buyNowBtn"
                                    onClick={setViewModelHelpher}
                                >
                                    Buy Now
                                </button>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className='buyImage'>
                                <img src={product.images.split(",")[0]} alt={product.name} />
                            </div>
                        </div>
                        <MyModal extra={extra} category={product.category} viewModel={viewModel} setViewModelHelpher={setViewModelHelpher} />
                    </div>
                    <SimilarItems product={product} category={product.category} />

                </>
            ) : (
                <h4>Not available</h4>
            )}
        </>
    );
};

export default BuyPage;
