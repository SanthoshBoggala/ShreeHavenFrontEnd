
import { createContext, useState } from 'react'

const RefetchProductContext = createContext()

export default RefetchProductContext

export const RefetchProductContextProvider = ({children}) => {
    const [ refetch, setRefetch ] = useState({
        refetch: 0
    })
    return (
        <RefetchProductContext.Provider value={{refetch, setRefetch}}>
            { children }
        </RefetchProductContext.Provider>
    )
}

