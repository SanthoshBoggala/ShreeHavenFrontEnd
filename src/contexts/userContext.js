import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

export default UserContext

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")
    return (
        <UserContext.Provider value={ {user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}
