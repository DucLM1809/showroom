import { useState } from 'react'
import AxiosPost from '../api/axiosPost'
import AxiosGet from '../api/axiosGet'
import AxiosPut from '../api/axiosPut'

export const usePostBooking = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)

  const handlePostBooing = async (id, body) => {
    setLoading(true)
    try {
      const res = await AxiosPost(`posts/${id}/booking`, body)

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
export const useGetBooking = () => {
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

export const useUpdateBookingStatus = () => {
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState()

  const handleUpdateBooking = async (id, body) => {
    try {
      setLoading(true)
      const res = await AxiosPut(`posts/${id}/booking/status`, body)

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

  return { loading, response, error, handleUpdateBooking }
}
