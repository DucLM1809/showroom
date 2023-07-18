import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
  } from "react-native-safe-area-context";
import { allProduct, hotProduct } from '../mockData/products';

import { Image, ScrollView } from '../tailwinds/tailwindComponent';
import CardBook from '../components/CardBook';
import { useGetBooking } from '../hooks/useBooking';
import { useIsFocused } from '@react-navigation/native';
import ModalPurchase from '../components/ModalPurchase';
import { useGetMyPayments } from '../hooks/usePayment';

const BookingScreen = ({navigation}) => {

  const getBooking = useGetBooking()
  const isFocus = useIsFocused()
  const [bookingList, setbookingList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [paymentProduct,setPaymentProduct] = useState({})

  const getPayment = useGetMyPayments()
  const [paymentList, setPaymentList] = useState([])

  useEffect(()=>{
    if(isFocus){
      getPayment.handleGetMyPayment()
    }
  },[isFocus])

  
  useEffect(()=>{
    if(getPayment.error){
      console.log(getPayment.error)
      return
    }
    if(getPayment.response){
      setPaymentList(getPayment.response)
    }
  },[getPayment])

  useEffect(()=>{
    if(isFocus){
      getBooking.handleGetBooking()
    }
  },[isFocus])

  useEffect(()=>{
    if(getBooking.error){
      console.log(getBooking.error)
      return
    }
    if(getBooking.response){
      setbookingList(getBooking.response)
    }
  },[getBooking])
  return (
    <SafeAreaView>
      <Text className='text-center text-2xl font-semibold mt-4'>Booking List</Text>
        <ScrollView className='mt-5 h-[90%]'>
          {bookingList.length >0 ?
<>
        {bookingList.map((item,index)=>{
            return(
                <View key={item.id}>
                    <CardBook paid={paymentList.find(o=>o.postId===item.postId)?true:false} booking={item} i={index} navigation={navigation}></CardBook>
                </View>
            )
        }) }
        </>:
        <View className="mt-[20%] h-[300px] flex justify-center items-center  ">
        <Image
          className="h-[90%] w-[50%] object-cover rounded-l-2xl"
          source={require("../assets/nodata.jpg")}
        />
        <Text className="text-xl">No data</Text>
      </View>
          }
        </ScrollView>
        <ModalPurchase
          modalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          product={paymentProduct}
        />
    </SafeAreaView>
  )
}

export default BookingScreen