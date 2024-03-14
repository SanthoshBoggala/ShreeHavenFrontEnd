import React, { useContext } from 'react'
import './uploadProduct.css'
import ProfileSideBar from '../ProfilePage/ProfileSideBar'
import SideBarContextProvider from '../contexts/SideBarContext'
import UploadProductForm from './UploadProductForm'
import UserContext from '../contexts/userContext'
import NotFoundAndUnAuthorized from '../Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized'

const UploadProductPage = () => {

    const { user } = useContext(UserContext)

    if(Object.keys(user).length === 0 || user.type == 'customer'){
        return (
            <NotFoundAndUnAuthorized />
        )
    }

    return (
        <SideBarContextProvider>
            <div>
                <ProfileSideBar active={'upload_product'} />
                <UploadProductForm />
            </div>
        </SideBarContextProvider>
    )
}

export default UploadProductPage
