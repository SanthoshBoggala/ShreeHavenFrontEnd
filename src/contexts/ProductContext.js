import { createContext, useState } from "react"

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) =>{
    const initialState = {
        key : ""
    }
    const [key, setKey] = useState(initialState);
    
    return (
        <ProductContext.Provider value={{key, setKey}}>
            { children }
        </ProductContext.Provider>
    )
}

export default ProductContextProvider



