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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREEN.STARTER} component={StarterScreen} />
            <Stack.Screen name={SCREEN.SIGNIN} component={SignInScreen} />
            <Stack.Screen name={SCREEN.SIGNUP} component={SignUpScreen} />
            <Stack.Screen name={SCREEN.HOME} component={HomeScreen} />
          </Stack.Navigator>
          {/* </KeyboardAvoidingView> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
