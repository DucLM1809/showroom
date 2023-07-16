import {
  Animated,
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const PostActionScreen = ({ setModalVisible }) => {
  const { height } = useWindowDimensions()
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
        <TouchableOpacity className='flex-row items-center gap-4 mb-4'>
          <MaterialIcons name='edit' size={25} color={'#b8bbbf'} />
          <Text className='text-xl'>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center gap-4'>
          <MaterialIcons name='delete-outline' size={25} color={'#b8bbbf'} />
          <Text className='text-xl'>Request Deletion</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostActionScreen
