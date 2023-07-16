import AsyncStorage from '@react-native-async-storage/async-storage'
const { LOCAL_STORAGE_ITEMS } = require('../constants/common')

const getAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem(
    LOCAL_STORAGE_ITEMS.ACCESS_TOKEN
  )
  return accessToken
}

const updateAccessToken = async (token) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN, token)
}

const setAccessToken = async (token) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN, token)
}

const removeAccessToken = async () => {
  await AsyncStorage.removeItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN)
}

const TokenService = {
  getAccessToken,
  updateAccessToken,
  setAccessToken,
  removeAccessToken
}

export default TokenService
