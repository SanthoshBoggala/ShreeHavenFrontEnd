import axios from "axios"
import { createContext, useEffect, useState } from "react"

const TypesCatesContext = createContext()

export default TypesCatesContext

export const TypesCatesContextProvider = ({children}) => {
    const [typesCates, setTypesCates ] = useState([])

    useEffect(()=>{
      async function getCates(){
        const url = `http://localhost:5000/api/type_category`

        const res = await axios.get(url)

        setTypesCates(res.data.typecategories)

      }

      try {
        getCates()
      } catch (error) {
        console.log(error)
      }
    }, [typesCates])

    return (
        <TypesCatesContext.Provider value = {{ typesCates, setTypesCates }}>
            {children}
        </TypesCatesContext.Provider>   
    )
}