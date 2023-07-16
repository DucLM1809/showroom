import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SCREEN } from '../constants/screen'
import ViewPostsScreen from '../screens/ViewPostsScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN.VIEW_POST}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={SCREEN.VIEW_POST}
        component={ViewPostsScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='person' size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeNavigator
