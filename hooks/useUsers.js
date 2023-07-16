import { useEffect, useState } from "react";
import TokenService from "../api/tokenService";
import AxiosGet from "../api/axiosGet";

export const getUserMe = () => {
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = await TokenService.getAccessToken();
                const res = await AxiosGet('users/me', {}, { headers: { Authorization: `Bearer ${accessToken}` } })

                if (res) {
                    setResponse(res.data);
                }
            } catch (error) {
                setError(error)
            }
        }
        fetchUser()

    }, [])

    return { response, error }
}