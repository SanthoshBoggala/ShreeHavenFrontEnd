import React, { useContext } from 'react'
import './typeCategory.css'
import ProfileSideBar from '../ProfilePage/ProfileSideBar'
import SideBarContextProvider from '../contexts/SideBarContext'
import CanModify from './CanModify'
import UserContext from '../contexts/userContext'
import NotFoundAndUnAuthorized from '../Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized'

const TypeCategory = () => {

    const { user } = useContext(UserContext)

    if(Object.keys(user).length === 0 || user.type == 'customer'){
        return (
            <NotFoundAndUnAuthorized />
        )
    }

    return (
        <SideBarContextProvider>
            <div>
                <ProfileSideBar active={'type_category'} />
                <CanModify />
            </div>
        </SideBarContextProvider>
    )
}

export default TypeCategory
