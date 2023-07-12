import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { useForm, useWatch } from 'react-hook-form'
import CustomInput from '../components/CustomInput'
import { SCREEN } from '../constants/screen'
import { useActivate, useResetPassword } from '../hooks/useAuth'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { useEffect } from 'react'
import { showToast } from '../utils/toast'

import Entypo from 'react-native-vector-icons/Entypo'
import { StyleSheet } from 'react-native'

const ResetPasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const email = useWatch({ control, name: 'email' })
  const [otpCode, setOtpCode] = useState(null)
  const [isOtpFilled, setIsOtpFilled] = useState(true)

  // MUTATION
  const { handleResetPassword, response, error } = useResetPassword()

  const onActivatePressed = (data) => {
    // validate user
    if (!otpCode) {
      setIsOtpFilled(false)
    } else {
      setIsOtpFilled(true)
      // handleSignUp(data)
      handleResetPassword({ ...data, otpCode })
    }
  }

  useEffect(() => {
    if (response) {
      showToast('Change Password Successfully!')
      navigation.navigate(SCREEN.SIGNIN)
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
          <Text className='my-6 text-lg font-semibold'>Activate</Text>
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

          <View className='mb-4'>
            <Text className='font-semibold mb-2'>
              Password <Text className='text-red-400'>*</Text>
            </Text>
            <CustomInput
              placeholder='Password'
              secureTextEntry={true}
              name='newPassword'
              control={control}
              rules={{
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
                  message:
                    'Password must contain at least one lower character, one upper character, digit or special symbol'
                }
              }}
            />
          </View>

          <View className='mb-4'>
            <Text className='font-semibold mb-2'>
              Confirm Password <Text className='text-red-400'>*</Text>
            </Text>
            <CustomInput
              placeholder='Confirm password'
              secureTextEntry={true}
              name='confirmPassword'
              control={control}
              rules={{
                required: 'Confirm password is required',
                validate: (value) =>
                  value === watch('newPassword') ||
                  'Confirm password do not match'
              }}
            />
          </View>

          <View className='mb-4'>
            <Text className='font-semibold mb-2'>
              OTP <Text className='text-red-400'>*</Text>
            </Text>

            <OTPInputView
              style={{ height: 200 }}
              pinCount={5}
              autoFocusOnLoad
              onCodeFilled={(code) => {
                setOtpCode(code)
                setIsOtpFilled(true)
              }}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />

            {!isOtpFilled && (
              <Text className='font-semibold mb-2'>
                <Text className='text-red-400 text-xs'>OTP isn't filled</Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            className='bg-primary-500 py-4 rounded-2xl'
            onPress={handleSubmit(onActivatePressed)}
          >
            <Text className='text-center font-semibold'>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6'
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6'
  }
})
