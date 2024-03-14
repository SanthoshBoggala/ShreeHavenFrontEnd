import { createContext, useState } from "react"

export const WishListKeyContext = createContext()

const WishListKeyContextProvider = ({ children }) =>{
    const initialState = {
        key : ""
    }
    const [key, setKey] = useState(initialState);
    
    return (
        <WishListKeyContext.Provider value={{key, setKey}}>
            { children }
        </WishListKeyContext.Provider>
    )
}

export default WishListKeyContextProvider



