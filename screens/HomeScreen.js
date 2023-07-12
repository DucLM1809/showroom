import { SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { useLogout } from '../hooks/useAuth'
import { useEffect } from 'react'
import { showToast } from '../utils/toast'
import { SCREEN } from '../constants/screen'
import TokenService from '../api/tokenService'
import { Text } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  // MUTATION
  const { handleLogout, error, response } = useLogout()

  const handleLogoutPressed = () => {
    handleLogout()
  }

  useEffect(() => {
    if (error) {
      showToast(error?.response?.data?.detail)
    }

    if (response?.status === 204) {
      navigation.navigate(SCREEN.SIGNIN)
      TokenService.removeAccessToken()
      showToast('Logout Successfully!')
    }
  }, [response, error])

  return (
    <SafeAreaView className='h-full bg-white'>
      <TouchableOpacity onPress={handleLogoutPressed}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen
