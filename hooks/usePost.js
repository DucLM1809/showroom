import { useEffect, useState } from 'react'
import AxiosGet from '../api/axiosGet'
import AxiosPost from '../api/axiosPost'
import AxiosPut from '../api/axiosPut'
import { ORDER_OPTION } from '../constants/post'
export const usePosts = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleGetPosts = async (params) => {
    setLoading(true)
    try {
      const res = await AxiosGet('posts/me', {
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
  const [loading, setLoading] = useState()

  const handleCreatePost = async (body) => {
    try {
      setLoading(true)
      const res = await AxiosPost('posts', body)

      if (res) {
        setLoading(false)
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setLoading(false)
      setResponse(null)
      setError(error)
    }
  }

  return { loading, response, error, handleCreatePost }
}

export const useUpdatePost = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState()

  const handleUpdatePost = async (id, body) => {
    try {
      setLoading(true)
      const res = await AxiosPut(`posts/${id}`, body)

      if (res) {
        setResponse(res)
        setError(null)
        setLoading(false)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
      setLoading(false)
    }
  }

  return { loading, response, error, handleUpdatePost }
}

export const usePost = (id) => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleGetPost = async (params) => {
    setLoading(true)
    try {
      const res = await AxiosGet(`posts/${id}`, params)

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
    handleGetPost()
  }, [])

  return { response, error, loading, handleGetPost }
}

export const useRequestDeletionPost = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState()

  const handleRequestDeletionPost = async (id) => {
    try {
      setLoading(true)
      const res = await AxiosPost(`posts/${id}/request-delete`)

      if (res) {
        setResponse(res)
        setError(null)
        setLoading(false)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
      setLoading(false)
    }
  }

  return { loading, response, error, handleRequestDeletionPost }
}

export const useGetPost = () => {
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

export const useGetCategories = () => {
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
