import { useEffect, useState } from 'react'
import AxiosGet from '../api/axiosGet'
import AxiosPost from '../api/axiosPost'

export const usePosts = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleGetPosts = async (params) => {
    setLoading(true)
    try {
      const res = await AxiosGet('posts/me', params)

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

  useEffect(() => {
    handleGetPosts()
  }, [])

  return { response, error, loading, handleGetPosts }
}

export const useCategories = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleGetCategories = async () => {
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

  useEffect(() => {
    handleGetCategories()
  }, [])

  return { response, error, loading, handleGetCategories }
}

export const useCreatePost = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleCreatePost = async (body) => {
    try {
      const res = await AxiosPost('posts', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleCreatePost }
}
