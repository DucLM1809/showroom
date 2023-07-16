import { useState, useEffect } from 'react'
import AxiosGet from '../api/axiosGet'
import TokenService from '../api/tokenService'
import AxiosPut from '../api/axiosPut'

export const useGetPosts = () => {
    const [error, setError] = useState()
    const [res, setRes] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const accessToken = await TokenService.getAccessToken()
                const res = await AxiosGet('admin/posts', {}, { headers: { Authorization: `Bearer ${accessToken}` } })

                console.log(accessToken);
                if (res) {
                    setRes(res.data)
                }
            } catch (error) {
                setError(error)
            }
        }

        fetchPosts()
    }, [])

    return { res, error }
}

export const updatePostStatus = async (postId, { status, adminNote }) => {
    const data = { status, adminNote }
    console.log(data);
    try {
        const response = await AxiosPut(`admin/posts/${postId}/status`, data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const useGetBookings = () => {
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const accessToken = await TokenService.getAccessToken();
                const res = await AxiosGet('admin/bookings', {}, { headers: { Authorization: `Bearer ${accessToken}` } })
                if (res) {
                    setResponse(res.data);
                }

            } catch (error) {
                setError(error)
            }
        }
        fetchBookings();
    }, [])
    return { response, error }
}

export const updateBookingStatus = async (bookingId, status) => {
    const data = { status }


    try {
        const response = await AxiosPut(`admin/bookings/${bookingId}/status`, data)
        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export const useGetUsers = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = await TokenService.getAccessToken();
                const res = await AxiosGet('admin/users', {}, { headers: { Authorization: `Bearer ${accessToken}` } })
                if (res) {
                    setResponse(res.data);
                }

            } catch (error) {
                setError(error)
            }
        }
        fetchUsers();
    }, [])
    return { response, error }
}

export const updateUserStatus = async (userId, isActive) => {
    const data = { isActive }

    try {
        const response = await AxiosPut(`admin/users/${userId}`, data)

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export const useGetPayments = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const accessToken = await TokenService.getAccessToken();
                const res = await AxiosGet('admin/payments', {}, { headers: { Authorization: `Bearer ${accessToken}` } })
                if (res) {
                    setResponse(res.data);
                }

            } catch (error) {
                setError(error)
            }
        }
        fetchPayments();
    }, [])
    return { response, error }
}