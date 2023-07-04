import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Lottie from 'lottie-react-native'
import { Image } from 'react-native'
import { SCREEN } from '../constants/screen'

const StarterScreen = ({ navigation }) => {
  const onSignUpPressed = (data) => {
    // validate user
    navigation.navigate(SCREEN.SIGNUP)
  }

  const onSignInPressed = () => {
    navigation.navigate(SCREEN.SIGNIN)
  }

  return (
    <SafeAreaView className='bg-white flex-1 px-6'>
      <View className='w-fit h-96'>
        <Lottie source={require('../assets/car.json')} autoPlay loop />
      </View>

      <View className='mb-8'>
        <View className='flex-row items-center gap-2 m-auto -translate-x-4 mb-4'>
          <Image source={require('../assets/suv.png')} className='w-10 h-10' />
          <Text className='text-2xl font-bold'>Caroom</Text>
        </View>
        <Text className='text-center'>Whatever you love, we have it.</Text>
      </View>

      <TouchableOpacity
        className='bg-primary-500 py-4 rounded-2xl mb-4'
        onPress={onSignUpPressed}
      >
        <Text className='text-center font-semibold'>Sign up</Text>
      </TouchableOpacity>
      <View className='flex-row gap-2 justify-center'>
        <Text>Already have account?</Text>
        <TouchableOpacity onPress={onSignInPressed}>
          <Text className='font-semibold underline'>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default StarterScreen
