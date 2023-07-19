import { Iproduct } from '../mockData/products'
import {
  Image,
  View,
  Text,
  TouchableOpacity
} from '../tailwinds/tailwindComponent'
import React from 'react'
import Icons from '@expo/vector-icons/MaterialIcons'
import { SCREEN } from '../constants/screen'

export interface Props {
  product: any
  i: number
  navigation: any
  setModalVisible: any
  setBookingProduct: any
  inWishList: boolean
  putWishList: any
  listBooking: any
}

const CardCate = ({
  product,
  i,
  navigation,
  setModalVisible,
  setBookingProduct,
  inWishList,
  putWishList,
  listBooking
}: Props) => {
  return (
    <TouchableOpacity
      className={`flex ${
        i == 0 ? 'h-[200px]' : 'h-[250px]'
      }  w-[93%] mx-auto mb-4 relative `}
      onPress={() => navigation.navigate(SCREEN.DETAILS, { id: product.id })}
    >
      <Image
        className='h-full object-cover rounded-2xl'
        source={{ uri: product.imageUrls[0] }}
      />

      <View className=' absolute top-0 left-0 w-full h-[50px] bg-[#01010145]   rounded-t-2xl flex justify-between items-center flex-row px-3'>
        <Text className=' text-sm font-semibold text-white w-[70%]'>
          {product.title}
        </Text>
        {inWishList ? (
          <TouchableOpacity
            className=' bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center'
            onPress={() => {
              putWishList({
                addedPostIds: [],
                removedPostIds: [product.id]
              })
            }}
          >
            <Icons name='favorite' size={20} color={'#b90404'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className=' bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center'
            onPress={() => {
              putWishList({
                addedPostIds: [product.id],
                removedPostIds: []
              })
            }}
          >
            <Icons name='favorite-outline' size={20} color={'#000'} />
          </TouchableOpacity>
        )}
      </View>

      <View className=' absolute bottom-2 left-[3%] w-[94%] h-[50px] bg-[#010101cd]  rounded-3xl flex justify-between items-center flex-row px-3'>
        <Text className=' text-md font-semibold text-white w-[70%]'>
          {product.price}$
        </Text>
        {/* <Text className=' text-md font-semibold text-white'>{product.price}</Text> */}
        {!listBooking?.find((item: any) => item?.postId === product?.id) && (
          <TouchableOpacity
            className=' bg-white w-[30%] h-[30px] rounded-full flex justify-center items-center'
            onPress={() => {
              setModalVisible(true)
              setBookingProduct(product)
            }}
          >
            <Icons name='pending-actions' size={20} color={'#000'} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CardCate
