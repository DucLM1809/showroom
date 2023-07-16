import { SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import TokenService from '../api/tokenService'

const HomeScreen = () => {
  const dispatch = useDispatch()

  return <SafeAreaView className='h-full bg-white'>
    <View>
      <Text>a</Text>
    </View>
  </SafeAreaView>
}

export default HomeScreen
