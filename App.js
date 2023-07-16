import { KeyboardAvoidingView, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'
import HomeScreen from './screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import StarterScreen from './screens/StarterScreen'
import { SCREEN } from './constants/screen'
import { useEffect, useState } from 'react'
import { getUserMe } from './hooks/useUsers'
import TokenService from './api/tokenService'
import RootNavigator from './screens/adminScreens/navigator/RootNavigator'

const Stack = createNativeStackNavigator()

export default function App() {



  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            style={{ flex: 1 }}
          > */}
          <RootNavigator />
          {/* </KeyboardAvoidingView> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
