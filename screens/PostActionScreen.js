import { View, Text, Alert, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SCREEN } from '../constants/screen'
import { useRequestDeletionPost } from '../hooks/usePost'
import { useEffect } from 'react'
import { showToast } from '../utils/toast'
import Toast from 'react-native-root-toast'

const PostActionScreen = ({
  setModalVisible,
  navigation,
  id,
  handleGetPosts
}) => {
  const { response, error, handleRequestDeletionPost } =
    useRequestDeletionPost()

  const handleEditPress = () => {
    navigation.navigate(SCREEN.EDIT_POST, { id })
  }

  const handleRequestDeletion = () => {
    Alert.alert('Confirm', 'Do you want to request admin for deletion?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: async () => {
          await handleRequestDeletionPost(id)
        },
        style: 'cancel'
      }
    ])
  }

  useEffect(() => {
    if (response && !error) {
      showToast('Request Deletion Successfully!')
      handleGetPosts()
      setModalVisible(false)
    }

    error &&
      showToast(
        error?.response?.data?.detail || 'Request Deletion Failed!',
        Toast.positions.TOP
      )
  }, [error])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}
    >
      <View className=' bg-white w-full rounded-tr-md rounded-tl-md p-4 h-1/2 border border-gray-300'>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className='mb-4 flex-row justify-end'
        >
          <MaterialIcons name='close' size={30} color={'#b8bbbf'} />
        </TouchableOpacity>
        <TouchableOpacity
          className='flex-row items-center gap-4 mb-4'
          onPress={handleEditPress}
        >
          <MaterialIcons name='edit' size={25} color={'#b8bbbf'} />
          <Text className='text-xl'>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='flex-row items-center gap-4'
          onPress={handleRequestDeletion}
        >
          <MaterialIcons name='delete-outline' size={25} color={'#b8bbbf'} />
          <Text className='text-xl'>Request Deletion</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostActionScreen
