import moment from 'moment/moment'
import React from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native'
import GridImageView from 'react-native-grid-image-viewer'
import PostStatusTag from './PostStatusTag'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native'
import { SCREEN } from '../constants/screen'
import { Modal } from 'react-native'
import { useState } from 'react'
import PostActionScreen from '../screens/PostActionScreen'
import GestureRecognizer from 'react-native-swipe-gestures'
import RenderHtml from 'react-native-render-html'
import { useWindowDimensions } from 'react-native'

const Post = ({ navigation, item, handleGetPosts, id, index }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { width } = useWindowDimensions()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREEN.DETAILS, { id })}
      key={id || index}
      className='bg-white my-2 mb-0 py-3'
    >
      <View className='flex-row justify-between px-4'>
        <View className='flex-row gap-2 items-center'>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
            }}
            className='rounded-full w-6 h-6'
          />
          <View className='flex'>
            <PostStatusTag status={item?.status} />
            <Text>{moment(item?.updatedAt).fromNow()}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ zIndex: 2 }}
        >
          <Entypo name='dots-three-horizontal' size={20} color={'#b8bbbf'} />
        </TouchableOpacity>
      </View>

      <View className='px-4 my-2'>
        <Text className='font-semibold text-base mb-2'>{item?.title}</Text>
        <RenderHtml contentWidth={width} source={{ html: item?.description }} />
      </View>

      <GridImageView data={item?.imageUrls} />

      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => setModalVisible(false)}
      >
        <Modal animationType='slide' visible={modalVisible} transparent={true}>
          <PostActionScreen
            setModalVisible={setModalVisible}
            navigation={navigation}
            id={item?.id}
            status={item?.status}
            handleGetPosts={handleGetPosts}
          />
        </Modal>
      </GestureRecognizer>
    </TouchableOpacity>
  )
}

export default Post
