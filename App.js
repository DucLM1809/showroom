import { KeyboardAvoidingView, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'

import HomeScreen from './screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import HomePage from './screens/adminScreens/Homepage'
import RootNavigator from './screens/adminScreens/navigator/RootNavigator'





export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            style={{ flex: 1 }}
          >
            <Stack.Navigator >
              <Stack.Screen name='HomeScreen' component={HomePage} />
            </Stack.Navigator>
          </KeyboardAvoidingView> */}
          <RootNavigator />

        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
