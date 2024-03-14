import { createContext, useState } from "react"

export const SideBarContext = createContext()

const SideBarContextProvider = ({ children }) =>{
    const initialState = {
        show: true,
        component: 'personalInfo'
    }
    const [sideBar, setSideBar] = useState(initialState);
    
    return (
        <SideBarContext.Provider value={{sideBar, setSideBar}}>
            { children }
        </SideBarContext.Provider>
    )
}

export default SideBarContextProvider



