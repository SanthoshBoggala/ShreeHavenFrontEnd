import CartItem from './CartItem'
import './cartPage.css'
import useFetchData from '../customHooks/useFetchData'
import { useContext, useState } from 'react'
import { LimitContext } from '../contexts/LimitContext'
import UserContext from '../contexts/userContext'
import NotFoundAndUnAuthorized from '../Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized'

const CartPage = ()=>{
    const { user, token } = useContext(UserContext)

    const [refetch, setRefetch] = useState(0)
    const { limit } = useContext(LimitContext)
    
    const url = 'http://localhost:5000/api/cart/user'
    const { data: { cart } , isLoading, error } = useFetchData({url, query: refetch ,token})

    const cartItems = (cart && cart.items) ? cart.items : []

    const handleRefetch = ()=>{
        setRefetch((prev) => prev + 1)
    }

    if(Object.keys(user).length === 0 || user.type == 'admin'){
        return (
            <NotFoundAndUnAuthorized />
        )
    }

    return (
        <div className='cartPage'>
            <h2 className='text-center'>My Cart</h2>
            { token && token.length !== 0 ? 
            (cartItems && cartItems.length !== 0) ? (
                cartItems.map((one, index) => <CartItem key={index} item = {one.product}  handleRefetch={handleRefetch}/>)
            ) : (
                <h5>Empty Cart. Try Some Shopping...</h5>
            ) : (
                <h5>Login to view your cart...</h5>
            ) }
        </div>
    )
}

export default CartPage