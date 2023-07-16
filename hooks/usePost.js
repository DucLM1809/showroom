import { useState } from "react"
import AxiosGet from "../api/axiosGet"
import { ORDER_OPTION } from '../constants/post'

export const useGetPost = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handleGetPosts = async (params) => {
        setLoading(true)
        try {
          const res = await AxiosGet('posts', {
            ...params,
            limit: params?.limit > 100 ? 100 : params.limit,
            offset: 0,
            order_by: ORDER_OPTION.NEWEST
          })
    
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

      return { response, error, handleGetPosts }
}

export const useGetPostById = ()=>{
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)

 
    const handleGetPostById = async (id) => {
      setLoading(true)
      try {
        const res = await AxiosGet(`posts/${id}`)
  
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

    return { response, error, handleGetPostById }
}

export const useGetCategories = ()=>{
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

   
      const handleGetCategories = async (params) => {
        setLoading(true)
        try {
          const res = await AxiosGet('posts/categories')
    
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

      return { response, error, handleGetCategories }
}

