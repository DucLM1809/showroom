import { useEffect } from 'react'
import { useState } from 'react'
import AxiosPost from '../api/axiosPost'
import AxiosDelete from '../api/axiosDelete'

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
