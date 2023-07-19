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
import { showToast } from '../utils/toast'
import { useGetPost } from '../hooks/usePost'
import { useGetWishList } from '../hooks/useWishList'

export interface props {
  modalVisible: boolean
  setModalVisible: any
  product: Iproduct
  handleGetBooking: any
  handleGetPosts: any
  handleGetWishList: any
}
const ModalBooking = ({
  modalVisible,
  setModalVisible,
  product,
  handleGetBooking,
  handleGetPosts,
  handleGetWishList
}: props) => {
  const [dateStr, setDateStr] = useState('')
  const [dateParse, setDateParse] = useState() as any
  const [note, setnote] = useState('.')

  // const getBooking = useGetBooking()
  const postBooking = usePostBooking()

  useEffect(() => {
    if (!postBooking.response && postBooking.error) {
      console.log(postBooking.error.response.data.detail)
      showToast(postBooking.error.response.data.detail)
    } else if (postBooking.response) {
      showToast('Booking successfully')
    }
  }, [postBooking.response, postBooking.error])

  const handleBook = async () => {
    await postBooking.handlePostBooing(product.id, {
      expectedVisitAt: dateParse,
      note: note
    })

    handleGetPosts && (await handleGetPosts())
    handleGetBooking && (await handleGetBooking())
    handleGetWishList && (await handleGetWishList())
  }

  useEffect(() => {
    dateParse && handleBook()
  }, [dateParse])

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
        <View className=' bg-white w-full h-[80%] absolute bottom-0 rounded-t-xl flex items-center'>
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
                Alert.alert('Confirm', 'Do you want to make a booking?', [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Ok',
                    onPress: async () => {
                      try {
                        const [dateValues, timeValues] = dateStr.split(' ')

                        let [year, month, day] = dateValues.split('/')
                        let [hours, minutes] = timeValues.split(':')

                        let date = new Date(
                          +year,
                          +month - 1,
                          +day,
                          +hours,
                          +minutes
                        )
                        setDateParse(date)
                      } catch (error) {
                        showToast('Please pick a date')
                        return
                      }

                      setModalVisible(false)
                    },
                    style: 'cancel'
                  }
                ])
              }}
            >
              <Text className=' text-lg font-semibold text-white'>Booking</Text>
            </TouchableOpacity>
          </View>

          <Text className=' text-2xl font-bold mt-3'>Booking</Text>
          <DatePicker onSelectedChange={(date) => setDateStr(date)} />
          <TextInput
            className='border w-[90%] px-3 absolute bottom-20 bg-white rounded-lg'
            multiline
            maxLength={60}
            numberOfLines={3}
            value={note}
            onChangeText={setnote}
            placeholder='Note'
          ></TextInput>
        </View>
      </View>
    </Modal>
  )
}

export default ModalBooking
