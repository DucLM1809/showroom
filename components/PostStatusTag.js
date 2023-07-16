import { View, Text } from 'react-native'
import React from 'react'
import { POST_STATUS } from '../constants/post'

const PostStatusTag = ({ status }) => {
  const handleTagColor = (status) => {
    switch (status) {
      case POST_STATUS.AWAITING_DELETION:
        return 'bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500'
      case POST_STATUS.REVIEW_REJECTED:
      case POST_STATUS.DELETE_REJECTED:
        return 'bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400'
      case POST_STATUS.RESERVED:
        return 'bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300'
      case POST_STATUS.SOLD:
        return 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'
      case POST_STATUS.UNDER_REVIEW:
        return 'bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400'
      default:
        return 'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'
    }
  }

  return (
    <View className={handleTagColor(status)}>
      <Text>{status}</Text>
    </View>
  )
}

export default PostStatusTag
