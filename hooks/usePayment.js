import { useState } from "react"
import AxiosGet from "../api/axiosGet"
import { ORDER_OPTION } from '../constants/post'
import AxiosPut from "../api/axiosPut"
import AxiosPost from "../api/axiosPost"

export const useGetMyPayments = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handleGetMyPayment = async () => {
        setLoading(true)
        try {
          const res = await AxiosGet('payments/me',null)
    
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

      return { response, error, handleGetMyPayment }
}

export const usePostPayment = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handlePostPayment = async (id, body) => {
        setLoading(true)
        try {
          const res = await AxiosPost(`posts/${id}/payment`,body)
    
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

      return { response, error, handlePostPayment }
}



