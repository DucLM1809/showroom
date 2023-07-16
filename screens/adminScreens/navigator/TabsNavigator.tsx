import { View, Text } from 'react-native'
import React from 'react'
import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Icons from '@expo/vector-icons/MaterialIcons'
import { CompositeScreenProps } from '@react-navigation/native'
import { RootStackScreenProps } from './RootNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomBottomTabs from '../components/CustomBottomTabs'
import HomePage from '../Homepage'
import BookingsMoanage from '../BookingsManage'
import TransactionManage from '../TransManage'
import PostsManage from '../PostsManage'
import UsersManage from '../UsersManage'
import PostDetail from '../PostsManage/PostDetail'
import { SCREEN } from '../../../constants/screen'
import ProfileScreen from '../../ProfileScreen'

export type TabsStackParamList = {
  Home: undefined
  Profile: undefined
}

export type HomeStackParamList = {
  Homepage: undefined
  BookingsManage: undefined
  TransManage: undefined
  PostsManage: undefined
  UsersManage: undefined
}
export type PostStackParamList = {
  PostsManage: undefined
  PostDetail: undefined
}

const TabsStack = createBottomTabNavigator<any>()
const HomeStack = createNativeStackNavigator<any>()
const PostStack = createNativeStackNavigator<any>()

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<'TabsStack'>
  >

const MyPostStack = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name={SCREEN.POSTS_MANAGE} component={PostsManage} />
      <PostStack.Screen name={SCREEN.POST_DETAIL} component={PostDetail} />
    </PostStack.Navigator>
  )
}

const MyHomeStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: route.name === SCREEN.POSTS_MANAGE ? false : true
      })}
    >
      <HomeStack.Screen name={SCREEN.ADMIN_HOME} component={HomePage} />
      <HomeStack.Screen
        name={SCREEN.BOOKING_MANAGE}
        component={BookingsMoanage}
      />
      <HomeStack.Screen
        name={SCREEN.TRANSACTION_MANAGE}
        component={TransactionManage}
      />
      <HomeStack.Screen name={SCREEN.POSTS_MANAGE} component={MyPostStack} />
      <HomeStack.Screen name={SCREEN.USERS_MANAGE} component={UsersManage} />
    </HomeStack.Navigator>
  )
}

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: route.name === SCREEN.ADMIN_HOME ? false : true
      })}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabsStack.Screen
        name={SCREEN.ADMIN_HOME}
        component={MyHomeStack}
        options={{
          tabBarIcon(props) {
            return <Icons name='home' {...props} />
          }
        }}
      />

      <TabsStack.Screen
        name={SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon(props) {
            return <Icons name='person' {...props} />
          }
        }}
      />
    </TabsStack.Navigator>
  )
}

export default TabsNavigator
