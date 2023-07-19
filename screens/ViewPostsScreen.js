import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native'
import React, { Suspense, useEffect } from 'react'
import Post from '../components/Post'
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useState } from 'react'
import { usePosts } from '../hooks/usePost'
import { useDebounce } from '../hooks/useDebounce'
import { SCREEN } from '../constants/screen'
import Spinner from 'react-native-loading-spinner-overlay'
import GestureRecognizer from 'react-native-swipe-gestures'
import DrawerFilterScreen from './DrawerFilterScreen'
import { ORDER_OPTION } from '../constants/post'

const ViewPostsScreen = ({ navigation }) => {
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    const paddingToBottom = 20
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState()
  const [limit, setLimit] = useState(20)
  const [categories, setCategories] = useState([])
  const [order_by, setOrderBy] = useState(ORDER_OPTION.NEWEST)
  const [status, setStatus] = useState()

  const search_keyword = useDebounce(search, 300)

  // QUERY
  const { response, error, loading, handleGetPosts } = usePosts()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetPosts()
    })

    return unsubscribe
  }, [])

  const handleLoadMore = () => {
    !loading && setLimit((prev) => prev + 10)
  }

  useEffect(() => {
    handleGetPosts(
      {
        ...(search_keyword && { search_keyword }),
        ...(order_by && { order_by }),
        ...(status && { status })
      },
      categories.length > 0 &&
        categories
          ?.map((category) => {
            return `categories=${category}`
          })
          .join('&')
    )
  }, [search_keyword, limit, categories, order_by, status])

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          handleLoadMore()
        }
      }}
    >
      <View className='bg-white pt-4'>
        <View className='flex-row justify-center items-center'>
          <Text className='text-lg font-semibold'>Posts</Text>
        </View>
        <View className='relative'>
          <View className='flex-row items-center gap-2 m-auto -translate-x-4 mb-4'>
            <Image
              source={require('../assets/suv.png')}
              className='w-10 h-10'
            />
            <Text className='text-2xl font-bold'>Caroom</Text>
          </View>

          <TouchableOpacity
            className='absolute right-4 top-2'
            onPress={() => navigation.navigate(SCREEN.CREATE_POST)}
          >
            <Feather
              name='plus'
              size={20}
              style={{
                flexShrink: 10,
                color: '#777777',
                padding: 12,
                backgroundColor: '#F0F0F3',
                borderRadius: 200
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className='my-4 flex-row items-center mx-2'>
        <Ionicons name='search-outline' size={25} />
        <TextInput
          className='flex-1 bg-white mx-2 rounded-md py-2 px-4 border border-gray-300 focus:border focus:border-blue-400'
          onChangeText={(value) => setSearch(value)}
          placeholder='Search keywords...'
        />
      </View>

      <TouchableOpacity
        className='my-4 flex-row items-center rounded-md w-24 ml-2'
        style={{
          flexShrink: 10,
          color: '#777777',
          padding: 12,
          backgroundColor: 'white'
        }}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name='filter-outline' size={20} />
        <Text>Filter</Text>
      </TouchableOpacity>

      <Spinner visible={loading || !response} textContent={'Loading...'} />
      {response?.map((item, index) => (
        <>
          <Post
            navigation={navigation}
            id={item?.id}
            index={index}
            item={item}
            handleGetPosts={handleGetPosts}
          />
        </>
      ))}

      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => setModalVisible(false)}
      >
        <Modal animationType='slide' visible={modalVisible} transparent={true}>
          <DrawerFilterScreen
            setModalVisible={setModalVisible}
            navigation={navigation}
            setCategories={setCategories}
            categories={categories}
            orderBy={order_by}
            setOrderBy={setOrderBy}
            status={status}
            setStatus={setStatus}
          />
        </Modal>
      </GestureRecognizer>
    </ScrollView>
  )
}

export default ViewPostsScreen