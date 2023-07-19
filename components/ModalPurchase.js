import { Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from '../tailwinds/tailwindComponent'
import { Iproduct } from '../mockData/products'
import Icons from '@expo/vector-icons/MaterialIcons'
import DatePicker from 'react-native-modern-datepicker'
import { ToastAndroid } from 'react-native'
import { useGetBooking, usePostBooking } from '../hooks/useBooking'
import { useGetMyPayments, usePostPayment } from '../hooks/usePayment'
import { showToast } from '../utils/toast'

const ModalPurchase = ({
  modalVisible,
  setModalVisible,
  product,
  handleGetWishList,
  handleGetBooking,
  handleGetPayment
}) => {
  const getBookingList = useGetBooking()
  const getBooking = useGetMyPayments()
  const postPayment = usePostPayment()

  useEffect(() => {
    if (postPayment.error) {
      console.log(postPayment.error)
      showToast('Transaction fail')
      return
    }
    if (postPayment.response) {
      showToast('Transaction completed')
    }
  }, [postPayment.error, postPayment.response])

  useEffect(() => {
    if (postPayment.error) {
      showToast('Purchase fail')
    } else if (postPayment.response) {
    }
  }, [postPayment.handlePostPayment])

  return (
    <Modal
      className=''
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View className='bg-[#0000008f] w-full h-full absolute bottom-0'>
        <View className=' bg-white w-full h-[45%] absolute bottom-[30%] rounded-t-xl flex items-center'>
          <Text className='my-10 text-3xl font-semibold'>Purchase</Text>
          <View className='flex justify-start w-full px-5'>
            <Text className=' text-2xl'>{product.title}</Text>
            <Text className='mt-5 text-3xl font-semibold text-red-600'>
              Total: ${product.price}
            </Text>
          </View>
          <View className=' absolute w-full bottom-6 z-10 flex-row justify-center '>
            <TouchableOpacity
              className='  bg-[#bab9b9] py-2 px-5 rounded-2xl mr-6'
              onPress={() => {
                setModalVisible(false)
              }}
            >
              <Text className=' text-lg font-semibold'>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='  bg-[#1779d4] py-2 px-5 rounded-2xl ml-6'
              onPress={() => {
                Alert.alert('Confirm', 'Are you sure to purchase this car?', [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Ok',
                    onPress: async () => {
                      await postPayment.handlePostPayment(product.id, {
                        amount: product.price
                      })
                      handleGetWishList && (await handleGetWishList())
                      handleGetBooking && (await handleGetBooking())
                      handleGetPayment && (await handleGetPayment())
                      setModalVisible(false)
                    },
                    style: 'cancel'
                  }
                ])
              }}
            >
              <Text className=' text-lg font-semibold text-white'>
                Purchase
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalPurchase
