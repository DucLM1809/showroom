import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Post from '../components/Post'
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useState } from 'react'
import { usePosts } from '../hooks/usePost'
import { useDebounce } from '../hooks/useDebounce'
import { SCREEN } from '../constants/screen'

const ViewPostsScreen = ({ navigation }) => {
  const [search, setSearch] = useState()

  const search_keyword = useDebounce(search, 300)

  // QUERY
  const { response, error, loading, handleGetPosts } = usePosts()

  return (
    <ScrollView>
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
          onChangeText={(value) => console.log('SEARCH: ', value)}
          placeholder='Search keywords...'
        />
      </View>

      {response?.map((item) => (
        <Post navigation={navigation} key={item?.id} item={item} />
      ))}
    </ScrollView>
  )
}

export default ViewPostsScreen
