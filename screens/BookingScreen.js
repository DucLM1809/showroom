import { View, Text } from 'react-native'
import React from 'react'
import {
    SafeAreaView,
  } from "react-native-safe-area-context";
import { allProduct, hotProduct } from '../mockData/products';

import { ScrollView } from '../tailwinds/tailwindComponent';
import CardBook from '../components/CardBook';

const BookingScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text className='text-center text-2xl font-semibold mt-4'>Booking List</Text>
        <ScrollView className='mt-5 h-[90%]'>
        {hotProduct.map((item,index)=>{
            return(
                <View key={item.id}>
                    <CardBook product={item} i={index} navigation={navigation}></CardBook>
                </View>
            )
        }) }
        </ScrollView>
    </SafeAreaView>
  )
}

export default BookingScreen