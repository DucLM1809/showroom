import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN } from '../constants/screen'
import StarterScreen from './StarterScreen'
import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'
import HomeScreen from './HomeScreen'
import ActivateScreen from './ActivateScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import ResetPasswordScreen from './ResetPasswordScreen'
import { useSelector } from 'react-redux'
import { selectIsSignedIn } from '../slices/navSlice'
import CreatePostScreen from './CreatePostScreen'
import EditPostScreen from './EditPostScreen'
import EditProfileScreen from './EditProfileScreen'

const Stack = createNativeStackNavigator()

const MainScreen = () => {
  const isSignedIn = useSelector(selectIsSignedIn)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name={SCREEN.HOME} component={HomeScreen} />
          <Stack.Screen
            name={SCREEN.CREATE_POST}
            component={CreatePostScreen}
          />
          <Stack.Screen name={SCREEN.EDIT_POST} component={EditPostScreen} />
          <Stack.Screen
            name={SCREEN.EDIT_PROFILE}
            component={EditProfileScreen}
          />
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen name={SCREEN.STARTER} component={StarterScreen} />
          <Stack.Screen name={SCREEN.SIGNIN} component={SignInScreen} />
          <Stack.Screen name={SCREEN.SIGNUP} component={SignUpScreen} />
          <Stack.Screen name={SCREEN.ACTIVATE} component={ActivateScreen} />
          <Stack.Screen
            name={SCREEN.FORGOT_PASSWORD}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name={SCREEN.RESET_PASSWORD}
            component={ResetPasswordScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default MainScreen
