import React, { useState, useContext } from 'react'
import './myOrders.css'
import SingleOrder from './SingleOrder'
import UserContext from '../../contexts/userContext'
import useFetchData from '../../customHooks/useFetchData'
import { LimitContext } from '../../contexts/LimitContext'

const MyOrders = () => {
  const [getOrders, setGetOrders] = useState("")
  const [refetch, setRefetch] = useState(0)
  const [viewMore, setViewMore] = useState(6)


  const { user, token } = useContext(UserContext)
  let url = 'http://localhost:5000/api/orders/user'
  if (getOrders && getOrders.length !== 0) {
    url = `http://localhost:5000/api/orders/user?status=${getOrders}`
  }

  if (user && user.type == 'admin') {
    url = 'http://localhost:5000/api/orders'
    if (getOrders && getOrders.length !== 0) {
      url = `http://localhost:5000/api/orders?status=${getOrders}`
    }
  }
  const { isLoading, data: { orders }, error } = useFetchData({ url, query: refetch, token })

  let limitedOrders = []

  if (!isLoading && orders && orders.length !== 0) {
    limitedOrders = orders.slice(0, viewMore)
  }

  const refetchHelpher = () => {
    setRefetch(prev => prev + 1)
  }
  const viewAll = () => {
    if (viewMore == orders.length) {
      setViewMore(6)
    }
    else {
      setViewMore(orders.length)
    }
  }
  return (
    <div className='myOrders'>
      <div className='orderHeading row'>
        <div className='col-md-2 col-4 myOrderTitle'>{user.type == 'admin' ? 'All Orders' : 'My Orders'}</div>
        <div className='col-md-7 col-6 orderText'>
          {user.type === 'admin' ? (
            <div>
              View and edit all pending, delivered <br />
              and returned orders here
            </div>
          ) : (
            <div>
              View all your pending, delivered <br />
              and returned orders here
            </div>
          )}
        </div>
        <div className='col-md-3 col-3'>
          <span className='orderFilters'> Status: </span>
          <select
            className='orderStatusForm'
            onChange={(e) => setGetOrders(e.target.value)}
          >
            <option value={''}>{'Choose....'}</option>
            <option value={'Pending'}>Pending</option>
            <option value={'Delivered'}>Delivered</option>
            <option value={'Failed'}>Failed</option>
          </select>
        </div>
      </div>
      <div className='Allorders'>
        {(limitedOrders && limitedOrders.length !== 0) ? (
          <>
            {limitedOrders.map((one, index) => (<SingleOrder {...one} key={index} refetchHelpher={refetchHelpher} />))}
            <button className='viewAll' onClick={viewAll}>{limitedOrders.length < 7 ? 'View more' : 'View Less'}</button>
          </>
        ) : (
          user && user.type == 'admin' ?
            (
              <h4>No Orders Available Right Now...</h4>
            )
            : (
              <h4>You haven`t shopped any! Try Shopping...  </h4>
            )
        )}
      </div>
    </div>
  )
}

export default MyOrders
