import React, { useContext } from 'react'
import './profilePage.css'
import { PersonalInfo } from '../Components'
import ProfileSideBar from './ProfileSideBar'
import SideBarContextProvider from '../contexts/SideBarContext'
import UserContext from '../contexts/userContext'
import NotFoundAndUnAuthorized from '../Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized'

const ProfilePage = () => {
    const { user } = useContext(UserContext)

    if(Object.keys(user).length === 0){
        return (
            <NotFoundAndUnAuthorized />
        )
    }

    return (
        <SideBarContextProvider>
            <div className='profilePage'>
                <ProfileSideBar active={'profile'}/>
                <PersonalInfo />
            </div>
        </SideBarContextProvider>

    )
}

export default ProfilePage
