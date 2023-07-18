import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
  } from "react-native-safe-area-context";
import { allProduct } from '../mockData/products';
import CardFavo from '../components/CardFavo';
import { ScrollView } from '../tailwinds/tailwindComponent';
import { useGetWishList, usePutWishList } from '../hooks/useWishList';
import { useIsFocused } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons'
import ModalBooking from '../components/ModalBooking';

const FavoriteScreen = ({navigation}) => {
  const [wishlistData, setwishlistData] = useState([])
  const getWishList = useGetWishList();
  const putWishList = usePutWishList();
  const isFocus = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingProduct, setBookingProduct] = useState({});

  useEffect(()=>{
    if(isFocus){
      getWishList.handleGetWishList()
    }
  },[isFocus])

  useEffect(()=>{
    if(putWishList.response){
      getWishList.handleGetWishList()
    }
  },[putWishList.response])

  useEffect(()=>{
    if(getWishList.response){
      setwishlistData(getWishList.response.posts)
    }
  },[getWishList.response])

  return (
    <SafeAreaView>
      <Text className='text-center text-2xl font-semibold mt-4'>Wish List</Text>
        <ScrollView className='mt-5 h-[90%] relative'>
          

        
        {wishlistData.length>0?<>{
        wishlistData.map((item,index)=>{
            return(
                <View key={item.id}>
                    <CardFavo putWishList={putWishList.handlePutWishList} product={item} i={index} navigation={navigation}></CardFavo>
                </View>
            )
        })}</>
        :
        
        <View className='mt-[50%] flex justify-center items-center  '>
          <Icons name='wysiwyg' size={50} color={'#666666'}/>
          <Text className=' text-center text-xl text-[#666666]'>No data</Text>
        </View>
      }

        </ScrollView>
        <ModalBooking
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          product={bookingProduct}
        />
    </SafeAreaView>
  )
}

export default FavoriteScreen