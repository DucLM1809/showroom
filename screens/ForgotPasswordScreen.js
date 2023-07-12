import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput'
import { SCREEN } from '../constants/screen'
import { useForgotPassword, useSignUp } from '../hooks/useAuth'

import { useEffect } from 'react'
import { showToast } from '../utils/toast'

import Entypo from 'react-native-vector-icons/Entypo'

const ForgotPasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  // MUTATION
  const { handleForgotPassword, error, response } = useForgotPassword()

  const onForgotPasswordPressed = (data) => {
    // validate user
    handleForgotPassword(data)
  }

  useEffect(() => {
    if (response) {
      showToast(
        'OTP has been resent to your email! Please check your email to reset your password.'
      )
      navigation.navigate(SCREEN.RESET_PASSWORD)
    }
    error && showToast(error?.response?.data?.detail)
  }, [response, error])

  return (
    <SafeAreaView className='bg-white flex-1'>
      <ScrollView className='px-6' showsVerticalScrollIndicator={false}>
        <View className='flex-row justify-between items-center'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='p-3 bg-disabled-500 rounded-lg'
          >
            <Entypo
              name='chevron-left'
              style={{
                fontSize: 18
              }}
            />
          </TouchableOpacity>
          <Text className='my-6 text-lg font-semibold'>Forgot Password</Text>
          <View></View>
        </View>

        <View className='flex-row items-center gap-2 m-auto -translate-x-4 mb-4'>
          <Image source={require('../assets/suv.png')} className='w-10 h-10' />
          <Text className='text-2xl font-bold'>Caroom</Text>
        </View>

        {/* FORM REGISTER */}
        <View className='mb-4'>
          <View className='mb-4'>
            <Text className='font-semibold mb-2'>
              Email <Text className='text-red-400'>*</Text>
            </Text>

            <CustomInput
              placeholder='Email'
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email format.'
                }
              }}
            />
          </View>

          <TouchableOpacity
            className='bg-primary-500 py-4 rounded-2xl'
            onPress={handleSubmit(onForgotPasswordPressed)}
          >
            <Text className='text-center font-semibold'>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
