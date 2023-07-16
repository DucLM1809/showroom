import { View, Text, Alert, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SCREEN } from '../constants/screen'
import { useDeletePost, useRequestDeletionPost } from '../hooks/usePost'
import { useEffect } from 'react'
import { showToast } from '../utils/toast'
import Toast from 'react-native-root-toast'
import { POST_STATUS } from '../constants/post'

const PostActionScreen = ({
  setModalVisible,
  navigation,
  id,
  handleGetPosts,
  status
}) => {
  const { response, error, handleRequestDeletionPost } =
    useRequestDeletionPost()

  const {
    response: responseDelete,
    error: errorDelete,
    handleDeletePost
  } = useDeletePost()

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

  const handleDeletion = () => {
    Alert.alert('Confirm', 'Do you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: async () => {
          await handleDeletePost(id)
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
  }, [error, response])

  useEffect(() => {
    if (responseDelete && !errorDelete) {
      showToast('Delete Post Successfully!')
      handleGetPosts()
      setModalVisible(false)
    }

    errorDelete &&
      showToast(
        error?.response?.data?.detail || 'Delete Post Failed!',
        Toast.positions.TOP
      )
  }, [errorDelete, responseDelete])

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
          <MaterialIcons
            name='close'
            size={20}
            style={{
              flexShrink: 10,
              color: '#777777',
              padding: 12,
              backgroundColor: '#F0F0F3',
              borderRadius: 200
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className='flex-row items-center gap-4 mb-4'
          onPress={handleEditPress}
        >
          <MaterialIcons
            name='edit'
            size={20}
            style={{
              flexShrink: 10,
              color: '#777777',
              padding: 12,
              backgroundColor: '#F0F0F3',
              borderRadius: 200
            }}
          />
          <Text className='text-xl'>Edit</Text>
        </TouchableOpacity>

        {status === POST_STATUS.UNDER_REVIEW ||
        status === POST_STATUS.REVIEW_REJECTED ? (
          <TouchableOpacity
            className='flex-row items-center gap-4'
            onPress={handleDeletion}
          >
            <MaterialIcons
              name='delete-outline'
              size={20}
              style={{
                flexShrink: 10,
                color: '#777777',
                padding: 12,
                backgroundColor: '#F0F0F3',
                borderRadius: 200
              }}
            />
            <Text className='text-xl'>Delete</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className='flex-row items-center gap-4'
            onPress={handleRequestDeletion}
          >
            <MaterialIcons
              name='delete-outline'
              size={20}
              style={{
                flexShrink: 10,
                color: '#777777',
                padding: 12,
                backgroundColor: '#F0F0F3',
                borderRadius: 200
              }}
            />
            <Text className='text-xl'>Request Deletion</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default PostActionScreen
