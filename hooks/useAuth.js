import { useEffect } from 'react'
import { useState } from 'react'
import AxiosPost from '../api/axiosPost'
import AxiosDelete from '../api/axiosDelete'
import AxiosGet from '../api/axiosGet'
import AxiosPut from '../api/axiosPut'

export const useLoginGoogle = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleLoginGoogle = async (body) => {
    try {
      const res = await AxiosPost('auth/users/tokens/google', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleLoginGoogle }
}

export const useLogin = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleLogin = async (body) => {
    try {
      const res = await AxiosPost('auth/users/tokens', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleLogin }
}

export const useSignUp = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleSignUp = async (body) => {
    try {
      const res = await AxiosPost('auth/users', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleSignUp }
}

export const useLogout = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleLogout = async () => {
    try {
      const res = await AxiosDelete('auth/users/tokens')

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleLogout }
}

export const useActivateResendRequest = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleActivateResendRequest = async (body) => {
    try {
      const res = await AxiosPost('auth/users/activate/request', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleActivateResendRequest }
}

export const useActivate = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleActivate = async (body) => {
    try {
      const res = await AxiosPost('auth/users/activate', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleActivate }
}

export const useForgotPassword = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleForgotPassword = async (body) => {
    try {
      const res = await AxiosPost('auth/users/forgot-password', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleForgotPassword }
}

export const useResetPassword = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleResetPassword = async (body) => {
    try {
      const res = await AxiosPost('auth/users/reset-password', body)

      if (res) {
        setResponse(res)
        setError(null)
      }
    } catch (error) {
      setResponse(null)
      setError(error)
    }
  }

  return { response, error, handleResetPassword }
}

export const useProfile = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleGetProfile = async () => {
    setLoading(true)
    try {
      const res = await AxiosGet('users/me')

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
    handleGetProfile()
  }, [])

  return { response, error, loading, handleGetProfile }
}

export const useUpdateProfile = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState()

  const handleUpdateProfile = async (body) => {
    try {
      setLoading(true)
      const res = await AxiosPut('users/me', body)

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

  return { loading, response, error, handleUpdateProfile }
}
