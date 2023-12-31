import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput'
import { SCREEN } from '../constants/screen'

import Entypo from 'react-native-vector-icons/Entypo'
import { useLogin } from '../hooks/useAuth'
import { showToast } from '../utils/toast'
import { useEffect } from 'react'

const SignInScreen = ({ navigation }) => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm()

  // MUTATION
  const { handleLogin, response, error } = useLogin()

  const onSignInPressed = (data) => {
    handleLogin(data)
  }

  const onSignUpPressed = () => {
    navigation.navigate(SCREEN.SIGNUP)
  }

  useEffect(() => {
    if (response) {
      showToast('Login successfully!')
      navigation.navigate(SCREEN.HOME)
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
          <Text className='my-6 text-lg font-semibold'>Log in</Text>
          <View></View>
        </View>

        <View className='flex-row items-center gap-2 m-auto -translate-x-4 mb-4'>
          <Image source={require('../assets/suv.png')} className='w-10 h-10' />
          <Text className='text-2xl font-bold'>Caroom</Text>
        </View>

        {/* FORM LOGIN */}
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

          <View className='mb-4'>
            <Text className='font-semibold mb-2'>
              Password <Text className='text-red-400'>*</Text>
            </Text>
            <CustomInput
              placeholder='Password'
              secureTextEntry={true}
              name='password'
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password should be minimum 3 characters long'
                }
              }}
            />
          </View>

          <TouchableOpacity
            className='bg-primary-500 py-4 rounded-2xl'
            onPress={handleSubmit(onSignInPressed)}
          >
            <Text className='text-center font-semibold'>Log in</Text>
          </TouchableOpacity>
        </View>

        <Text className='font-semibold underline mb-4'>Forgot password</Text>

        <View className='flex-row items-center justify-center mb-4'>
          <View className='flex-1 h-[1px] bg-gray-300'></View>
          <Text className='font-semibold bg-background my-2 mx-2'>or</Text>
          <View className='flex-1  h-[1px] bg-gray-300'></View>
        </View>

        <TouchableOpacity className='p-4 rounded-2xl flex-row items-center justify-between border mb-4'>
          <Image source={require('../assets/google.png')} className='w-4 h-4' />
          <Text className='text-center'>Continue with Google</Text>
          <View></View>
        </TouchableOpacity>

        <View className='flex-row gap-2'>
          <Text>New to Caroom?</Text>
          <TouchableOpacity onPress={onSignUpPressed}>
            <Text className='font-semibold underline'>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignInScreen
