import { KeyboardAvoidingView, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './screens/MainScreen'
import { useMemo } from 'react'
import { LogBox } from 'react-native'

const Stack = createNativeStackNavigator()

export default function App() {
  const theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#fff',
        text: '#191919',
        border: '#d9d9d9',
        primary: '#191919'
      }
    }),
    []
  )

  LogBox.ignoreAllLogs()

  return (
    <Provider store={store}>
      <SafeAreaProvider theme={theme}>
        <NavigationContainer>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            style={{ flex: 1 }}
          > */}
          <MainScreen />
          {/* </KeyboardAvoidingView> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
