import { useEffect } from 'react'
import { useState } from 'react'
import AxiosPost from '../api/axiosPost'

export const useLogin = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  const handleLogin = async (body) => {
    try {
      const res = await AxiosPost('auth/users/tokens', body)

      if (res) {
        setResponse(res)
      }
    } catch (error) {
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
      }
    } catch (error) {
      setError(error)
    }
  }

  return { response, error, handleSignUp }
}
