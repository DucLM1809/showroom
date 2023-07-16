import Toast from 'react-native-root-toast'

export const showToast = (message, position) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position
  })
}
