import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/PaymentScreen';
import Icons from "@expo/vector-icons/MaterialIcons"
import FavoriteScreen from '../screens/FavoriteScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type TabsStackParamList = {
    Home: undefined;
    Booking: undefined;
    WishList: undefined;
    Purchase: undefined;
    Profile: undefined;
}

const Tab = createBottomTabNavigator<TabsStackParamList>()
const TabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown:false, tabBarShowLabel:false}}>
        <Tab.Screen name='Home' component={HomeScreen} options={{ headerShown:false, tabBarIcon(props){
          return <Icons name='home' {...props}/>
        }}} />
        <Tab.Screen name='WishList' component={FavoriteScreen} options={{ headerShown:false, tabBarIcon(props){
          return <Icons name='favorite' {...props}/>
        }}} />
        <Tab.Screen name='Booking' component={BookingScreen} options={{ headerShown:false, tabBarIcon(props){
          return <Icons name='pending-actions' {...props}/>
        }}} />
        <Tab.Screen name='Purchase' component={CartScreen} options={{ headerShown:false, tabBarIcon(props){
          return <Icons name='payment' {...props}/>
        }}} />
        <Tab.Screen name='Profile' component={ProfileScreen} options={{ headerShown:false, tabBarIcon(props){
          return <Icons name='person' {...props}/>
        }}} />
    </Tab.Navigator>
  )
}

export default TabsNavigator