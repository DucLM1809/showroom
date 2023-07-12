import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { useForm, useWatch } from 'react-hook-form'
import CustomInput from '../components/CustomInput'
import { SCREEN } from '../constants/screen'
import { useActivateResendRequest } from '../hooks/useAuth'

import { useEffect } from 'react'
import { showToast } from '../utils/toast'

import Entypo from 'react-native-vector-icons/Entypo'

const ActivateScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const email = useWatch({ control, name: 'email' })

  // MUTATION
  const { handleActivateResendRequest, response, error } =
    useActivateResendRequest()

  const onSignUpPressed = (data) => {
    // validate user
    handleSignUp(data)
  }

  const onActivateResendRequestPressed = () => {
    handleActivateResendRequest({ email })
  }

  useEffect(() => {
    if (response) {
      showToast('OTP has been resent to your email!')
    }

    console.log(error?.toString())
    // error && showToast(error?.response?.data?.detail)
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
          <Text className='my-6 text-lg font-semibold'>Sign Up</Text>
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
            onPress={handleSubmit(onSignUpPressed)}
          >
            <Text className='text-center font-semibold'>Activate</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-center mb-4'>
          <View className='flex-1 h-[1px] bg-gray-300'></View>
          <Text className='font-semibold bg-background my-2 mx-2'>or</Text>
          <View className='flex-1  h-[1px] bg-gray-300'></View>
        </View>

        <View className='flex-row gap-2 justify-center'>
          <TouchableOpacity onPress={onActivateResendRequestPressed}>
            <Text className='font-semibold underline'>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ActivateScreen
