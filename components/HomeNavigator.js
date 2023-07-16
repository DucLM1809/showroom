import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SCREEN } from '../constants/screen'
import ViewPostsScreen from '../screens/ViewPostsScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileScreen from '../screens/ProfileScreen'
import Icons from '@expo/vector-icons/MaterialIcons'
import UserViewPostsScreen from '../screens/UserViewPostsScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import BookingScreen from '../screens/BookingScreen'
import CartScreen from '../screens/CartScreen'

const Tab = createBottomTabNavigator()

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN.USER_VIEW_POSTS}
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name={SCREEN.USER_VIEW_POSTS}
        component={UserViewPostsScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name='home' {...props} />
          }
        }}
      />
      <Tab.Screen
        name={SCREEN.WISHLIST}
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name='favorite' {...props} />
          }
        }}
      />
      <Tab.Screen
        name='Booking'
        component={BookingScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name='pending-actions' {...props} />
          }
        }}
      />
      <Tab.Screen
        name={SCREEN.PURCHASE}
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name='payment' {...props} />
          }
        }}
      />
      <Tab.Screen
        name={SCREEN.VIEW_POST}
        component={ViewPostsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name='post-outline'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name={SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='person' size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeNavigator
