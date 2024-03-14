import './itemCard.css'
import React, { useContext, useEffect, useState } from 'react'
import useModifyData from '../../customHooks/useModifyData'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/userContext'
import red from '../../Images/red.png'
import grey from '../../Images/wishlist1.png'
import axios from 'axios'

const ItemCard = ({ item , caption , home = false, notProducts = false, topRated = false}) => {
    const navigate = useNavigate()
    const { user,token } = useContext(UserContext)

    const url1 = `http://localhost:5000/api/wishlist`
    const { modifyData } = useModifyData({url: url1, token})

    const [wishlist, setWishlist] = useState(false)

    useEffect(()=>{
        async function setWishListInitial(){
            const url = `http://localhost:5000/api/wishlist/user?key=${item.key}`
            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data.wishListItem){
                setWishlist(res.data.wishListItem)
            }
            else{
                setWishlist(false)
            }
        }
        if(user.type === 'customer'){
            setWishListInitial()
            .then(()=> {})
            .catch(()=> setWishlist(false))
        }
    },[token, user, item.key])

    const navigateToItem = () => {
        if (topRated) {
            navigate(`/products/top_rated/${item.category}`)
            return
        }

        navigate(`/products/${item.type}/${item.key}`)
    }

    const toggoleWishList = async()=>{
        if(user.type !== 'customer') return

        const wish = {
            key: item.key
        }
        const { data: { wishListItem }, error } = await modifyData(wish)

        if(error){
            console.log('only customers can control wishlist mechanism....')
        }
        else{
            setWishlist(wishListItem)            
        }
    }

return (
    <div className={ notProducts ? `itemCardMain col-6 col-sm-4 col-md-3 col-lg-2` : 'itemCardMain col-lg-2 col-md-3 col-sm-4 col-6'}>
        <div className='itemCard'>
            <div className='itemImg img-fluid' style={{ height: home ? '300px' : '250px' }}>
                <img
                    src={item.images.split(',')[0]}
                    alt={item.name}
                    onClick={navigateToItem}
                />
                {topRated ||
                    <>
                        <div className='itemOffer'>
                            {`-${item.discount}%`}
                        </div>
                        <div className='itemWishlist'>
                            <img
                                onClick={toggoleWishList}
                                src={wishlist ? red : grey}
                                alt={wishlist ? 'inWishlist' : 'notInWishlist'}
                            />
                        </div>
                        {
                            item.inStock || (
                                <div className='outOfStock'>
                                    Out of stock
                                </div>
                            )
                        }
                    </>
                }
            </div>
            <div className='itemDown'>
                {topRated === false ?
                    <>
                        <div className='itemBrand'>{item.brand}</div>
                        <div className='itemName'>{item.name}</div>
                        <div>
                            <span className='itemNewPrice'>{`₹${item.newPrice}`}</span>
                            <strike className='itemPrice'>{`₹${item.price}`}</strike>
                        </div>
                    </>
                    :
                    <>
                        <div className='itemCategory'>{item.category}</div>
                        <div className='itemCategoryCaption'>{caption}</div>
                    </>
                }
            </div>
        </div>
    </div>
)
}

export default ItemCard
