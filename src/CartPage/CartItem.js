import './cartPage.css'
import { useNavigate } from 'react-router-dom'
import useModifyData from '../customHooks/useModifyData'
import { useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import UserContext from '../contexts/userContext'


const CartItem = ({ item, handleRefetch })=>{
    const navigate = useNavigate()
    const { token } = useContext(UserContext)
    const url = `http://localhost:5000/api/cart`
    const { modifyData } = useModifyData({url, method: "PUT", token})

    const getDateAfterEightDays = () => {
        const today = new Date();
        const eightDaysLater = new Date(today);
        eightDaysLater.setDate(today.getDate() + 8);
      
        const options = { weekday: 'short', month: 'short', day: '2-digit' };
        const formattedDate = eightDaysLater.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const goToBuy = ()=>{
        if(!Boolean(item.inStock)){
            toast.error('Sorry! Not available right now...')
            return
        }
        navigate(`/products/${item.type}/${item.key}/buy`)
    }

    const removeFromCart = async()=>{
        const cartData = {
            key: item.key
        }
        const { data, isSending, error } = await modifyData(cartData)

        if(error){
            toast.error('Failed to remove from cart!')
        }
        else{
            setTimeout(()=>{
                handleRefetch()
            }, 1000)
            toast.success('Removed from cart Successfully!')
            
        }
    }
    return (
        <div className='row cartItem'>
            <div className='col-md-4 imageContainer'>
                <img 
                    src={item.images.split(",")[0]}
                    className='cartImage img-fluid'
                    alt={item.name}
                />
            </div>
            <div className='col-md-8 cartItemDetails'>
                    <div className="cartItemBrand">
                        {item.brand}
                    </div>
                    <div className="cartItemName">
                        {item.name}
                    </div>
                    <div className="cartItemPrice">
                        <div className="cartItemDiscount me-2">{item.discount + '% off'}</div>
                        <div className="cartItemOPrice me-2"><strike>{"₹" + item.price}</strike></div>
                        <div className="cartItemNPrice">{"₹" + item.newPrice}</div>
                    </div>
                    <div>
                        <span class="badge bg-primary cartItemStarRating me-2">{item.starRating + '★'}</span>
                        <span className="cartItemRatings">({item.ratings})</span>
                    </div>
                    <div className='cartItemDelivery'>
                        { Boolean(item.inStock) ? (<span>Delivery by {getDateAfterEightDays()}</span>)
                        : (<span>Not available right now...</span>)
                        }
                    </div>
                    <div className='row justify-content-center mt-2'>
                        <div className='col-6'>
                            <button className='buyNow'
                                onClick={goToBuy}
                            >
                                { Boolean(item.inStock) ? 'Buy this Now' : 'Not Available'}
                            </button>
                        </div>
                        <div className='col-6'>
                            <button className='remove'
                                onClick={removeFromCart}
                            >
                                Remove</button>
                        </div>
                    </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CartItem