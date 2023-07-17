import { useState } from "react"
import AxiosPost from "../api/axiosPost"
import AxiosGet from "../api/axiosGet"

export const usePostBooking = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handlePostBooing = async (id,body) => {
        setLoading(true)
        try {
          const res = await AxiosPost(`posts/${id}/booking`,body)
    
          if (res) {
            setResponse(res?.data)
            setError(null)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
          setResponse(null)
          setError(error)
        }
      }

      return { response, error, handlePostBooing }
}
export const useGetBooking = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handleGetBooking = async () => {
        setLoading(true)
        try {
          const res = await AxiosGet(`bookings/me`)
    
          if (res) {
            setResponse(res?.data)
            setError(null)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
          setResponse(null)
          setError(error)
        }
      }

      return { response, error, handleGetBooking }
}

