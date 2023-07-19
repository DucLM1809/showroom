import {} from 'react-native'
import React from 'react'
import {
  Image,
  View,
  Text,
  TouchableOpacity
} from '../tailwinds/tailwindComponent'
import { SCREEN } from '../constants/screen'

const CardSmall = ({ product, navigation }) => {
  return (
    <TouchableOpacity
      className='flex h-full relative '
      onPress={() => navigation.navigate(SCREEN.DETAILS, { id: product.id })}
    >
      <Image
        className='h-full object-cover rounded-2xl'
        source={{ uri: product?.imageUrls[0] }}
      />
      <View className=' absolute top-2 left-2 w-[60px] h-[30px] bg-[#01010170] rounded-xl flex justify-center items-center'>
        <Text className=' text-lg font-semibold text-white'>
          {product?.price}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardSmall
