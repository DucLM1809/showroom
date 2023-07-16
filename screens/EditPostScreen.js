import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomInput from '../components/CustomInput'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import {
  useCategories,
  useCreatePost,
  usePost,
  useUpdatePost
} from '../hooks/usePost'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import AxiosPost from '../api/axiosPost'
import GridImageView from 'react-native-grid-image-viewer'
import { showToast } from '../utils/toast'
import { MultiSelect } from 'react-native-element-dropdown'
import { StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { ORDER_OPTION } from '../constants/post'

const EditPostScreen = ({ navigation, route }) => {
  const { id } = route.params
  const [imageUrls, setImageUrls] = useState([])

  const richText = useRef()

  // QUERY
  const { loading, response: categories } = useCategories()
  const { loading: loadingPost, response: post } = usePost(id)

  // MUTATION
  const {
    loading: loadingUpdatePost,
    error: errorUpdatePost,
    response,
    handleUpdatePost
  } = useUpdatePost()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm()

  useEffect(() => {
    if (post) {
      setValue('title', post?.title)
      setValue('description', post?.description)
      setValue('price', post?.price?.toString())
      setValue(
        'categoryIds',
        post?.categories?.map((item) => item?.id)
      )
      setImageUrls(post?.imageUrls)
    }
  }, [post])

  const openImagePicker = () => {
    ImagePicker?.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      compressImageQuality: 0.8,
      mediaType: 'any',
      includeBase64: true
    }).then((response) => {
      response
        ?.map((item) => {
          const pathSplitArr = item?.path?.split('/')
          const fileName = pathSplitArr[pathSplitArr.length - 1]
          return { fileName, data: item }
        })
        ?.forEach((item) => {
          AxiosPost('auth/presigned-urls/post', {
            object_name: item?.fileName
          }).then((response) => {
            const formData = new FormData(response.data?.url)
            Object.entries(response.data?.fields).forEach(([key, value]) => {
              formData.append(key, value)
            })
            formData.append('file', {
              name: item?.fileName,
              uri: item?.data?.path,
              type: item?.data?.mime
            })
            axios
              .postForm(response.data?.url, formData)
              .then(() =>
                setImageUrls((prev) => [
                  ...prev,
                  `${process.env.IMAGE_URI}${item?.fileName}`
                ])
              )
          })
        })
    })
  }

  const handleRemoveSelectedImages = (image) => {
    setImageUrls((prev) => [...prev].filter((item) => item !== image))
  }

  const onUpdatePost = (data) => {
    handleUpdatePost(id, {
      ...data,
      price: Number(data.price),
      imageUrls
    })
  }

  useEffect(() => {
    if (response && !errorUpdatePost) {
      showToast('Update Post Successfully!')
      navigation.goBack()
    }

    errorUpdatePost &&
      showToast(
        errorUpdatePost?.response?.data?.detail || 'Update Post Failed!'
      )
  }, [response, errorUpdatePost])

  return (
    <>
      {loading || loadingPost || loadingUpdatePost ? (
        <Spinner
          visible={loading || loadingPost || loadingUpdatePost}
          textContent={'Loading...'}
        />
      ) : (
        <SafeAreaView className='bg-white flex-1'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='bg-white pt-4'>
              <View className='flex-row justify-center items-center'>
                <Text className='text-lg font-semibold'>Edit Post</Text>
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
                  Title <Text className='text-red-400'>*</Text>
                </Text>

                <CustomInput
                  placeholder='Title'
                  control={control}
                  name='title'
                  rules={{
                    required: 'Title is required'
                  }}
                />
              </View>

              <View className='mb-4'>
                <Text className='font-semibold mb-2'>
                  Description <Text className='text-red-400'>*</Text>
                </Text>
                <Controller
                  control={control}
                  name='description'
                  rules={{
                    required: 'Description is required'
                  }}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error }
                  }) => (
                    <>
                      <View
                        className={
                          'border border-gray-300 focus:border focus:border-blue-400 rounded-2xl py-2 mb-2'
                        }
                      >
                        <RichEditor
                          ref={richText}
                          onChange={onChange}
                          onBlur={onBlur}
                          initialContentHTML={value}
                          placeholder='Description'
                        />
                      </View>
                      {error && (
                        <Text className='text-red-500 text-xs mt-1'>
                          {error.message || 'Error'}
                        </Text>
                      )}
                    </>
                  )}
                />
                <RichToolbar
                  editor={richText}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1
                  ]}
                />
              </View>

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
              </View>

              <View className='mb-4'>
                <Text className='font-semibold mb-2'>
                  Categories <Text className='text-red-400'>*</Text>
                </Text>

                <Controller
                  control={control}
                  name='categoryIds'
                  rules={{
                    required: 'Categories is required'
                  }}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error }
                  }) => (
                    <>
                      <MultiSelect
                        labelField='label'
                        valueField='value'
                        search
                        data={
                          categories
                            ? categories?.map((item) => ({
                                value: item?.id,
                                label: item?.name
                              }))
                            : []
                        }
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                      />
                      {error && (
                        <Text className='text-red-500 text-xs mt-1'>
                          {error.message || 'Error'}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              <View className='mb-4'>
                <Text className='font-semibold mb-2'>
                  Images <Text className='text-red-400'>*</Text>
                </Text>
                <GridImageView
                  data={imageUrls}
                  renderGridImage={(item) => (
                    <View className='relative flex-row'>
                      <Image
                        source={{ uri: item }}
                        style={{ width: 110, height: 110 }}
                      />
                      <TouchableOpacity
                        onPress={() => handleRemoveSelectedImages(item)}
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
                />

                <TouchableOpacity
                  className='border border-gray-300 focus:border focus:border-blue-400 rounded-2xl p-4 mb-2'
                  onPress={openImagePicker}
                >
                  <Text className='text-center font-semibold'>Upload</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className='bg-primary-500 py-4 rounded-2xl'
                onPress={handleSubmit(onUpdatePost)}
              >
                <Text className='text-center font-semibold'>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  )
}

export default EditPostScreen

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
