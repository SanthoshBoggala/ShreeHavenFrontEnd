import axios from "axios"
import { useEffect, useState } from "react"

const useFetchData = ({url, query ,token})=>{
    const [state, setState] = useState({
        data: {},
        isLoading: false,
        error: ""
    })
    useEffect(()=>{
        const getData = async()=>{
            try {
                setState({isLoading: true, error: "", data: {}})
                const res = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                    params: {...query}
                })
                setState({isLoading: false, error: "", data: res.data})
            } catch (error) {
                setState({isLoading: false, error, data: {}})
            }
        }
        getData()
    },[url, query, token])
    return { ...state}
}

export default useFetchData