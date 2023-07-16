import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SCREEN } from '../constants/screen'
import ViewPostsScreen from '../screens/ViewPostsScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
      {/* <Tab.Screen
        name={SCREEN.HOME}
        component={ViewPostsScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          )
        }}
      /> */}
    </Tab.Navigator>
  )
}

export default HomeNavigator
