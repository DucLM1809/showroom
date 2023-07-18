import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
  } from "react-native-safe-area-context";
import { allProduct, hotProduct } from '../mockData/products';

import { ScrollView } from '../tailwinds/tailwindComponent';
import CardBook from '../components/CardBook';
import { useGetBooking } from '../hooks/useBooking';
import { useIsFocused } from '@react-navigation/native';
import { useGetMyPayments } from '../hooks/usePayment';
import CardPay from '../components/CardPay';

const PaymentScreen = ({navigation}) => {
  const isFocus = useIsFocused()

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
  return (
    <SafeAreaView>
      <Text className='text-center text-2xl font-semibold mt-4'>Purchase List</Text>
        <ScrollView className='mt-5 h-[90%]'>
        {paymentList.map((item,index)=>{
            return(
                <View key={item.id}>
                    <CardPay payment={item} i={index} navigation={navigation}></CardPay>
                </View>
            )
        }) }
        </ScrollView>
    </SafeAreaView>
  )
}

export default PaymentScreen