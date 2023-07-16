import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useLogout, useProfile } from '../hooks/useAuth'
import { useEffect } from 'react'
import { SCREEN } from '../constants/screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch } from 'react-redux'
import { showToast } from '../utils/toast'
import TokenService from '../api/tokenService'
import { setIsSignedIn } from '../slices/navSlice'

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  // QUERY
  const { loading, error, handleGetProfile, response } = useProfile()

  // MUTATION
  const {
    handleLogout,
    error: errorLogout,
    response: responseLogout
  } = useLogout()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetProfile()
    })

    return unsubscribe
  }, [])

  const handleLogoutPressed = () => {
    handleLogout()
  }

  useEffect(() => {
    if (errorLogout) {
      showToast(errorLogout?.response?.data?.detail)
    }

    if (responseLogout?.status === 204) {
      TokenService.removeAccessToken()
        .then(() => {
          dispatch(setIsSignedIn(false))
          navigation.navigate(SCREEN.SIGNIN)
          showToast('Logout Successfully!')
        })
        .catch((err) => console.log('ERR', err))
    }
  }, [responseLogout, errorLogout])

  return (
    <ScrollView>
      <Spinner visible={loading} />
      <View className='bg-white pt-4'>
        <View className='flex-row justify-center items-center'>
          <Text className='text-lg font-semibold'>Profile</Text>
        </View>
        <View className='relative'>
          <View className='flex-row items-center gap-2 m-auto -translate-x-4 mb-4'>
            <Image
              source={require('../assets/suv.png')}
              className='w-10 h-10'
            />
            <Text className='text-2xl font-bold'>Caroom</Text>
          </View>

          <TouchableOpacity
            className='absolute right-4 top-2'
            onPress={() => navigation.navigate(SCREEN.EDIT_PROFILE)}
          >
            <MaterialIcons
              name='edit'
              size={20}
              style={{
                flexShrink: 10,
                color: '#777777',
                padding: 12,
                backgroundColor: '#F0F0F3',
                borderRadius: 200
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className='bg-white my-2 mb-0 p-3'>
        <Text className='font-bold text-xl'>Avatar</Text>
        <View className='flex-row justify-center my-4'>
          <Image
            source={{
              uri:
                response?.avatarUrl ||
                'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
            }}
            className='rounded-full w-48 h-48'
          />
        </View>
      </View>

      <View className='bg-white my-2 mb-0 p-3'>
        <Text className='font-bold text-xl mb-4'>Detail</Text>

        <View className='flex-row gap-4 mb-2'>
          <Text className='font-medium'>Email:</Text>
          <Text>{response?.email}</Text>
        </View>

        <View className='flex-row gap-4 mb-2'>
          <Text className='font-medium'>First Name:</Text>
          <Text>{response?.firstName}</Text>
        </View>

        <View className='flex-row gap-4 mb-2'>
          <Text className='font-medium'>Last Name:</Text>
          <Text>{response?.lastName}</Text>
        </View>

        <View className='flex-row gap-4 mb-2'>
          <Text className='font-medium'>Full Name:</Text>
          <Text>{response?.fullName}</Text>
        </View>

        <View className='flex-row gap-4 mb-2'>
          <Text className='font-medium'>Phone Number:</Text>
          <Text>{response?.phoneNumber}</Text>
        </View>
      </View>

      <TouchableOpacity
        className='bg-primary-500 py-4 rounded-2xl mx-2 mt-4'
        onPress={handleLogoutPressed}
      >
        <Text className='text-center font-semibold'>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ProfileScreen
