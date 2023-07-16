import { SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { useLogout, useProfile } from '../hooks/useAuth'
import { useEffect } from 'react'
import { showToast } from '../utils/toast'
import { SCREEN } from '../constants/screen'
import TokenService from '../api/tokenService'
import { setIsSignedIn } from '../slices/navSlice'
import HomeNavigator from '../components/HomeNavigator'
import Post from '../components/Post'
import RootNavigator from './adminScreens/navigator/RootNavigator'
import Spinner from 'react-native-loading-spinner-overlay'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  // MUTATION
  const { handleLogout, error, response } = useLogout()

  // QUERY
  const { loading, response: responseProfile } = useProfile()

  const handleLogoutPressed = () => {
    handleLogout()
  }

  useEffect(() => {
    if (error) {
      showToast(error?.response?.data?.detail)
    }

    if (response?.status === 204) {
      TokenService.removeAccessToken().then(() => {
        navigation.navigate(SCREEN.SIGNIN)
        showToast('Logout Successfully!')
        dispatch(setIsSignedIn(false))
      })
    }
  }, [response, error])

  return (
    <SafeAreaView className='h-full bg-white'>
      {/* <TouchableOpacity onPress={handleLogoutPressed}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
      <Post /> */}
      {loading ? (
        <Spinner visible={loading} />
      ) : (
        <>
          {responseProfile?.role === 'ADMIN' ? (
            <RootNavigator />
          ) : (
            <HomeNavigator />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen
