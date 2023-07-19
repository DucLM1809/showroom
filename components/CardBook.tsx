import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from '../tailwinds/tailwindComponent'
import React, { useEffect, useState } from 'react'
import Icons from '@expo/vector-icons/MaterialIcons'
import { useGetPostById } from '../hooks/usePost'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'
import { SCREEN } from '../constants/screen'
import { BOOKING_STATUS } from '../constants/common'
import { useUpdateBookingStatus } from '../hooks/useBooking'
import { showToast } from '../utils/toast'
import { Alert } from 'react-native'

export interface Props {
  booking: any
  i: number
  navigation: any
  setIsModalVisible: any
  setPaymentProduct: any
  paid: boolean
  handleGetBooking: any
}

const CardBook = ({
  booking,
  i,
  navigation,
  setIsModalVisible,
  setPaymentProduct,
  paid,
  handleGetBooking
}: Props) => {
  const getPostById = useGetPostById()
  const [product, setproduct] = useState({}) as any
  const isFocus = useIsFocused()
  const { handleUpdateBooking, error, response } = useUpdateBookingStatus()

  useEffect(() => {
    getPostById.handleGetPostById(booking.postId)
  }, [])

  useEffect(() => {
    if (getPostById.error) {
      console.log(getPostById.error)
      return
    }
    if (getPostById.response) {
      setproduct(getPostById.response)
    }
  }, [getPostById])

  const handleCancelBooking = () => {
    Alert.alert('Confirm', 'Are you sure to cancel booking?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: async () => {
          await handleUpdateBooking(booking.postId, {
            status: BOOKING_STATUS.CANCELED
          })
        },
        style: 'cancel'
      }
    ])
  }

  const handleReBooking = () => {
    Alert.alert('Confirm', 'Are you sure to re-book?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: async () => {
          await handleUpdateBooking(booking.postId, {
            status: BOOKING_STATUS.PENDING
          })
        },
        style: 'cancel'
      }
    ])
  }

  useEffect(() => {
    if (response && !error) {
      showToast(
        `${booking?.status === BOOKING_STATUS.PENDING ? 'Cancel' : ''} ${
          booking?.status === BOOKING_STATUS.CANCELED ? 'Re-book' : ''
        } Booking Successfully!`
      )
      getPostById.handleGetPostById(booking.postId)
      handleGetBooking()
    }

    error && showToast(error?.response?.data?.detail || 'Create Post Failed!')
  }, [error, response])

  return (
    <TouchableOpacity
      className={`flex-row h-[175px] w-[93%] mx-auto mb-4 relative   `}
      onPress={() =>
        navigation.navigate(SCREEN.DETAILS, { id: booking.postId })
      }
    >
      {product?.imageUrls && (
        <Image
          className='h-full w-[50%] object-cover rounded-l-2xl'
          source={{ uri: product?.imageUrls[0] }}
        />
      )}

      <View className='h-full w-[50%] bg-slate-200 rounded-r-2xl  flex relative pl-2 '>
        <Text className=' text-xl font-semibold'>{product.title}</Text>
        <Text className='text-base'>${product.price}</Text>
        <Text className=' text-lg mt-3 text-[#000000] h-[40%] overflow-hidden'>
          {moment(booking.expectedVisitAt).format('yyyy-MM-DD HH:mm')}
        </Text>

        <View className='absolute bottom-0 flex-row items-center justify-end w-full mb-2 mr-2'>
          {!paid && (
            <>
              {booking?.status === BOOKING_STATUS.PENDING && (
                <TouchableOpacity
                  className='flex-1 ml-4 border border-red-500 bg-white rounded-md'
                  onPress={handleCancelBooking}
                >
                  <Text className='text-lg text-center text-red-500'>
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}
              {booking?.status === BOOKING_STATUS.CANCELED && (
                <TouchableOpacity
                  className='flex-1 ml-4 border border-blue-500 bg-white rounded-md'
                  onPress={handleReBooking}
                >
                  <Text className='text-lg text-center text-blue-500'>
                    Re-Book
                  </Text>
                </TouchableOpacity>
              )}
              {booking?.status === BOOKING_STATUS.CONFIRMED && (
                <View className='flex-1 ml-4 border border-green-500 bg-white rounded-md'>
                  <Text className='text-lg text-center text-green-500'>
                    Confirmed
                  </Text>
                </View>
              )}
              <TouchableOpacity
                className='z-10 w-[40px] h-[40px] bg-[#ffffff] flex justify-center items-center rounded-full ml-2'
                onPress={() => {
                  setIsModalVisible(true)
                  setPaymentProduct(product)
                }}
              >
                <Icons name='payment' size={25} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardBook
