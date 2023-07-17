import { useState } from "react"
import AxiosGet from "../api/axiosGet"
import { ORDER_OPTION } from '../constants/post'
import AxiosPut from "../api/axiosPut"

export const useGetWishList = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handleGetWishList = async () => {
        setLoading(true)
        try {
          const res = await AxiosGet('wishlist/me',null)
    
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

      return { response, error, handleGetWishList }
}

export const usePutWishList = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handlePutWishList = async (body) => {
        setLoading(true)
        try {
          const res = await AxiosPut('wishlist/me',body)
    
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

      return { response, error, handlePutWishList }
}



