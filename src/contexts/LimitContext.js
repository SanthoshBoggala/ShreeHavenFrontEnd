import { createContext, useState } from "react"

export const LimitContext = createContext()

const LimitContextProvider = ({ children }) =>{
    const initialState = {
        limit: 6
    }
    const [limit, setLimit] = useState(initialState);
    
    return (
        <LimitContext.Provider value={{limit, setLimit}}>
            { children }
        </LimitContext.Provider>
    )
}

export default LimitContextProvider



