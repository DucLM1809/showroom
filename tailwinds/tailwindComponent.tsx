import { styled } from 'nativewind'
import {
  Image as BaseImage,
  SafeAreaView as BaseSafeAreaView,
  ScrollView as BaseScrollView,
  Text as BaseText,
  TextInput as BaseTextInput,
  TouchableOpacity as BaseTouchableOpacity,
  View as BaseView
} from 'react-native'



// import { KeyboardAwareScrollView as BaseKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const View = styled(BaseView)
const ScrollView = styled(BaseScrollView)
const Text = styled(BaseText)
const SafeAreaView = styled(BaseSafeAreaView)
const Image = styled(BaseImage)
const TouchableOpacity = styled(BaseTouchableOpacity)
const TextInput = styled(BaseTextInput)

// const KeyboardAwareScrollView = styled(BaseKeyboardAwareScrollView)

export {
  View,
  ScrollView,
  SafeAreaView,
  Text,
//   BottomSheet,
  Image,
  TouchableOpacity,
  TextInput,
//   KeyboardAwareScrollView
}
