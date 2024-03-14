import { createContext, useState } from "react"

export const SelectedFilters = createContext()

const SelectedFiltersProvider = ({ children }) =>{
    const initialState = {
        priceUnder: 100000 ,
        sortOption: 1,
        ratings: 1,
    }
    const [filters, setFilters] = useState(initialState);
    
    return (
        <SelectedFilters.Provider value={{filters, setFilters}}>
            { children }
        </SelectedFilters.Provider>
    )
}

export default SelectedFiltersProvider



