import React, { useContext, useEffect, useState } from 'react'
import './myOrders.css'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/userContext'
import useModifyData from '../../customHooks/useModifyData'


const SingleOrder = (order) => {

    const navigate = useNavigate()
    const { user: { type }, token } = useContext(UserContext)
    const url = `http://localhost:5000/api/orders/${order._id}`
    const { modifyData } = useModifyData({ url, method: "PUT", token })
    const [orderStatus, setOrderStatus] = useState(null)

    const findOrderAndDeliverDate = (d, d1) => {
        const newDate = new Date(d)
        let newDate1
        if (d1 !== 'undefined') {
            newDate1 = new Date(d1);

        } else {
            newDate1 = new Date(d);
            newDate1.setDate(newDate1.getDate() + 6);
        }



        const orderDate = newDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        const deliveryDate = newDate1.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return { orderDate, deliveryDate };
    }

    useEffect(() => {
        setOrderStatus(order.status)
    }, [order])

    const { orderDate, deliveryDate } = findOrderAndDeliverDate(String(order.orderedDate), String(order.deliveredDate))

    const updateOrder = async () => {
        const { data, error } = await modifyData({ status: orderStatus })

        if (error) {
            toast.error("error in updating order")
            return
        }
        if (data) {
            toast.success("Successfully Updated order")
            setTimeout(() => {
                order.refetchHelpher()
            }, 1000)
        }
    }

    const goToProduct = () => {
        navigate(`/products/${order.product.type}/${order.product.key}`)
    }
    return (
        <div className='orderDiv mb-4'>
            <div className='orderUpper row'>
                <div className='orderIdDiv col-sm-7'>
                    {type === 'admin' ?
                        <>
                            <div className='orderIdFront'>Customer</div>
                            <div className='orderId'>{` #${order.user}`}</div>
                        </> : (
                            <>
                                <div className='orderIdFront'>Order</div>
                                <div className='orderId'>{` #${order._id}`}</div>
                            </>
                        )
                    }
                </div>
                <div className='orderedDate col-sm-5'>{`Order Placed: ${orderDate}`}</div>
            </div>
            <div className='order row g-2'>
                <div className='orderImageDiv col-md-2'>
                    <div className='orderImage'>
                        <img
                            src={order.product.images.split(",")[0]}
                            alt='order'
                            onClick={goToProduct}
                        />
                    </div>
                </div>
                <div className='orderDetails col-md-5'>
                    <div className='orderName'>{order.product.name}</div>
                    <div className='orderBrand'>{`By: ${order.product.brand}`}</div>
                    <div className='orderOtherDetails'>
                        <div className='orderSize'>{order.size && `Size ${order.size}`}</div>
                        <div className='orderQuantity'>{order.count && `Qty: ${order.count}`}</div>
                        <div className='orderPrice'>{`Rs. ${order.price}`}</div>
                    </div>
                </div>
                <div className='orderStatusDiv col-md-2'>
                    <div className='status'>Current Status</div>
                    <div className='orderStatus'>
                        {type == 'admin' && !['Delivered', 'Failed'].includes(order.status)  ? (
                            <>
                                <select
                                    className='orderStatusForm'
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                >
                                    <option value={orderStatus}>{orderStatus}</option>
                                    <option value={'Delivered'}>Delivered</option>
                                    <option value={'Failed'}>Failed</option>
                                </select>
                            </>
                        ) : (
                            order.status
                        )}

                    </div>
                </div>
                <div className='orderDateDiv col-md-3'>
                    {order.deliveredDate ? (
                        <>
                            <div className='date'>Delivered on:</div>
                            <div className='orderDate'>{deliveryDate}</div>
                        </>
                    ) : (
                        <>
                            <div className='date'>Expected Delivery on:</div>
                            <div className='orderDate'>{deliveryDate}</div>
                        </>
                    )}
                    <ToastContainer />
                    {type === 'admin' && !['Delivered', 'Failed'].includes(order.status)&& (
                        <button
                            className='updateOrder'
                            onClick={updateOrder}
                        >
                            Update Order
                        </button>
                    )}
                </div>
            </div >
        </div >
    )
}

export default SingleOrder
