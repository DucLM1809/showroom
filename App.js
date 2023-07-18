import { KeyboardAvoidingView, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'
import HomeScreen from './screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabsNavigator from './navigators/TabsNavigator'
import DetailScreen from './screens/DetailScreen'
import { useMemo } from 'react'
import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator()


export default function App() {

  const theme = useMemo(
    ()=>({
      ...DefaultTheme,
      colors:{
        ...DefaultTheme.colors,
        background:'#fff',
        text: '#191919',
        border: '#d9d9d9',
        primary: '#191919'
      }
    }),
    []
  );
  return (
    <Provider store={store}>
      
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            style={{ flex: 1 }}
          >
            <Stack.Navigator>
              <Stack.Screen name='TabsStack' component={TabsNavigator} options={{headerShown:false}}/>
              <Stack.Screen name='Details' component={DetailScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
           
          </KeyboardAvoidingView>
        </NavigationContainer>
      </SafeAreaProvider>
      
    </Provider>
  )
}
