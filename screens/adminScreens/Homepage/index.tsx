import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import Icons from '@expo/vector-icons/MaterialIcons'

import CardHome from '../components/CardHome'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabsStackScreenProps } from '../navigator/TabsNavigator'
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity
} from '../components/styled'
import { getUserMe } from '../../../hooks/useUsers'
import { SCREEN } from '../../../constants/screen'

const HomePage = ({ navigation }: TabsStackScreenProps<'Home'>) => {
  const data = [
    {
      title: 'Bookings Management',
      name: SCREEN.BOOKING_MANAGE,
      amount: 21,
      icons: 'format-list-bulleted',
      color: 'black'
    },
    {
      title: 'Transactions Management',
      name: SCREEN.TRANSACTION_MANAGE,
      amount: 30,
      icons: 'monetization-on',
      color: 'black'
    },
    {
      title: 'Posts Management',
      name: SCREEN.POSTS_MANAGE,
      amount: 30,
      icons: 'post-add',
      color: 'black'
    },
    {
      title: 'Users Management',
      name: SCREEN.USERS_MANAGE,
      amount: 200,
      icons: 'people',
      color: 'black'
    }
  ]
  const { colors } = useTheme()
  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    fullName: string
    avatarUrl: string
    role: 'ADMIN' | 'USER'
    isActive: boolean
    isActivated: boolean
  }

  const { response } = getUserMe()
  const user: User = response
  console.log(user)

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        <StyledView className='px-6 flex flex-row items-center gap-2'>
          <Image
            source={{
              uri: user?.avatarUrl
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode='cover'
          />
          <StyledView className='flex-1'>
            <StyledText
              className='text-lg font-bold mb-2 text-gray-600'
              numberOfLines={1}
            >
              Hi,{user?.fullName}👋
            </StyledText>
            <StyledText className='text-gray-600 opacity-75' numberOfLines={1}>
              Manage your application here!
            </StyledText>
          </StyledView>
          <StyledTouchableOpacity className='w-14 h-14 border-2 border-gray-300 items-center justify-center rounded-full'>
            <Icons name='notifications' size={24} color={colors.text} />
          </StyledTouchableOpacity>
        </StyledView>

        {data.map((item) => (
          <CardHome
            title={item.title}
            name={item.name}
            amount={item.amount}
            icon={item.icons}
            color={item.color}
            key={item.name}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}

export default HomePage
