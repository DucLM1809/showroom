import axios from 'axios'
import AxiosPut from './axiosPut'
import TokenService from './tokenService'

const axiosClient = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await TokenService.getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== 'auth/users/tokens' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const rs = await AxiosPut('auth/users/tokens', {})

          const { accessToken } = rs.data
          await TokenService.updateAccessToken(accessToken)

          return axiosClient(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  }
)

export default axiosClient
