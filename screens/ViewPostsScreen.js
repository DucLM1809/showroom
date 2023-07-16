import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
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

  const [search, setSearch] = useState()
  const [limit, setLimit] = useState(20)

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
    console.log('LOAD MORE')
    !loading && setLimit((prev) => prev + 10)
  }

  useEffect(() => {
    handleGetPosts({
      limit,
      ...(search_keyword && { search_keyword })
    })
  }, [search_keyword, limit])

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

      <View className='my-4 flex-row items-center'>
        <Ionicons name='search-outline' size={25} />
        <TextInput
          className='flex-1 bg-white mx-2 rounded-md py-2 px-4 border border-gray-300 focus:border focus:border-blue-400'
          onChangeText={(value) => setSearch(value)}
          placeholder='Search keywords...'
        />
      </View>

      <Spinner visible={loading} textContent={'Loading...'} />
      {response?.map((item) => (
        <>
          <Post
            navigation={navigation}
            id={item?.id}
            item={item}
            handleGetPosts={handleGetPosts}
          />
        </>
      ))}
    </ScrollView>
  )
}

export default ViewPostsScreen
