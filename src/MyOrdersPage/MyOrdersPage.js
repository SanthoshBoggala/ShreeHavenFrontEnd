import React, { useContext } from 'react'
import './myOrdersPage.css'
import { MyOrders } from '../Components'
import ProfileSideBar from '../ProfilePage/ProfileSideBar'
import SideBarContextProvider from '../contexts/SideBarContext'
import UserContext from '../contexts/userContext'
import NotFoundAndUnAuthorized from '../Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized'

const MyOrdersPage = () => {
    const { user } = useContext(UserContext)

    if(Object.keys(user).length === 0){
        return (
            <NotFoundAndUnAuthorized />
        )
    }

    return (
        <SideBarContextProvider>
            <div>
                <ProfileSideBar active={'orders'}/>
                <MyOrders />
            </div>
        </SideBarContextProvider>

    )
}

export default MyOrdersPage
