import axios from "axios"

const useModifyData = ({ url, method = "POST", token = "" }) => {

  const modifyData = async (data) => {
    try {
      let response

      if (method === "POST") {
        response = await axios.post(url, { ...data }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } else if (method === "PUT") {
        response = await axios.put(url, { ...data }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } else if (method === "DELETE") {
        response = await axios.delete(url, { ...data }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
   
      return {   
        isSending: false,
        error: "",
        data: response.data
      }

    } catch (error) {
        return {
            isSending: false,
            error,
            data: {}
          }
    }
  }

  return { modifyData }
}

export default useModifyData
