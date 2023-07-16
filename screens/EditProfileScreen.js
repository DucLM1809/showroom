import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomInput from '../components/CustomInput'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import AxiosPost from '../api/axiosPost'
import { showToast } from '../utils/toast'
import { StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useProfile, useUpdateProfile } from '../hooks/useAuth'

const EditProfileScreen = ({ navigation }) => {
  const [avatarUrl, setAvatarUrl] = useState()

  // QUERY
  const { loading, error, handleGetProfile, response } = useProfile()

  // MUTATION
  const {
    loading: loadingUpdateProfile,
    error: errorUpdateProfile,
    response: responseUpdateProfile,
    handleUpdateProfile
  } = useUpdateProfile()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm()

  useEffect(() => {
    if (response) {
      setValue('firstName', response?.firstName)
      setValue('lastName', response?.lastName)
      setValue('fullName', response?.fullName)
      setAvatarUrl(response?.avatarUrl)
    }
  }, [response])

  const openImagePicker = () => {
    ImagePicker?.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      compressImageQuality: 0.8,
      mediaType: 'any',
      includeBase64: true,
      maxFiles: 1
    }).then((response) => {
      const pathSplitArr = response?.path?.split('/')
      const fileName = pathSplitArr[pathSplitArr.length - 1]
      AxiosPost('auth/presigned-urls/post', {
        object_name: fileName
      }).then((res) => {
        const formData = new FormData(res.data?.url)
        Object.entries(res.data?.fields).forEach(([key, value]) => {
          formData.append(key, value)
        })
        formData.append('file', {
          name: fileName,
          uri: response?.path,
          type: response?.mime
        })
        axios
          .postForm(res?.data?.url, formData)
          .then(() => setAvatarUrl(`${process.env.IMAGE_URI}${fileName}`))
          .catch((err) => console.log('ERR', err))
      })
    })
  }

  const handleRemoveSelectedImages = () => {
    setAvatarUrl('')
  }

  const onUpdatePost = (data) => {
    handleUpdateProfile({
      ...data,
      avatarUrl
    })
  }

  useEffect(() => {
    if (responseUpdateProfile && !errorUpdateProfile) {
      showToast('Update Profile Successfully!')
      navigation.goBack()
    }

    errorUpdateProfile &&
      showToast(
        errorUpdateProfile?.response?.data?.detail || 'Update Profile Failed!'
      )
  }, [responseUpdateProfile, errorUpdateProfile])

  return (
    <>
      <Spinner visible={loading} textContent={'Loading...'} />

      <SafeAreaView className='bg-white flex-1'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='bg-white pt-4'>
            <View className='flex-row justify-center items-center'>
              <Text className='text-lg font-semibold'>Edit Profile</Text>
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
                className='absolute left-4 top-2'
                onPress={() => navigation.goBack()}
              >
                <Entypo
                  name='chevron-left'
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

          <View className='mb-4 p-4'>
            <View className='mb-4'>
              <Text className='font-semibold mb-2'>
                Images <Text className='text-red-400'>*</Text>
              </Text>

              {avatarUrl && (
                <View className='relative flex-row my-4 justify-center'>
                  <Image
                    source={{ uri: avatarUrl }}
                    className='rounded-full w-48 h-48'
                  />
                  <TouchableOpacity
                    onPress={() => handleRemoveSelectedImages()}
                  >
                    <Ionicons
                      name='close'
                      size={10}
                      style={{
                        flexShrink: 10,
                        color: '#777777',
                        padding: 4,
                        backgroundColor: '#F0F0F3',
                        borderRadius: 200,
                        position: 'absolute',
                        top: 4,
                        right: 4
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                className='border border-gray-300 focus:border focus:border-blue-400 rounded-2xl p-4 mb-2'
                onPress={openImagePicker}
              >
                <Text className='text-center font-semibold'>Upload</Text>
              </TouchableOpacity>
            </View>

            <View className='mb-4'>
              <Text className='font-semibold mb-2'>First Name</Text>

              <CustomInput
                placeholder='First Name'
                control={control}
                name='firstName'
              />
            </View>

            <View className='mb-4'>
              <Text className='font-semibold mb-2'>Last Name</Text>

              <CustomInput
                placeholder='Last Name'
                control={control}
                name='lastName'
              />
            </View>

            <View className='mb-4'>
              <Text className='font-semibold mb-2'>Full Name</Text>

              <CustomInput
                placeholder='Full Name'
                control={control}
                name='fullName'
              />
            </View>

            <View className='mb-4'>
              <Text className='font-semibold mb-2'>Password</Text>
              <CustomInput
                placeholder='Password'
                secureTextEntry={true}
                name='password'
                control={control}
                rules={{
                  pattern: {
                    value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
                    message:
                      'Password must contain at least one lower character, one upper character, digit or special symbol'
                  }
                }}
              />
            </View>

            {watch('password') && (
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
                    validate: (value) =>
                      value === watch('password') ||
                      'Confirm password do not match'
                  }}
                />
              </View>
            )}

            {/* 
              <View className='mb-4'>
                <Text className='font-semibold mb-2'>
                  Price <Text className='text-red-400'>*</Text>
                </Text>

                <CustomInput
                  keyboardType={'numeric'}
                  placeholder='Price'
                  control={control}
                  name='price'
                  rules={{
                    required: 'price is required'
                  }}
                />
              </View> */}

            <TouchableOpacity
              className='bg-primary-500 py-4 rounded-2xl'
              onPress={handleSubmit(onUpdatePost)}
            >
              <Text className='text-center font-semibold'>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 14
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16
  }
})
