import {   } from 'react-native'
import React from 'react'
import { Iproduct } from '../mockData/products'
import tw from 'tailwind-react-native-classnames';
import { Image, View, Text, TouchableOpacity } from '../tailwinds/tailwindComponent';

const CardSmall = ({product, navigation}) => {
    
  
  return (
    <TouchableOpacity className='flex h-full relative ' onPress={()=> navigation.navigate("Details", { id: product.id })} >
      <Image className='h-full object-cover rounded-2xl' source={{ uri: product?.imageUrls[0]}}/>
      <View className=' absolute top-2 left-2 w-[60px] h-[30px] bg-[#01010170] rounded-xl flex justify-center items-center'>
        <Text className=' text-lg font-semibold text-white'>{product?.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardSmall