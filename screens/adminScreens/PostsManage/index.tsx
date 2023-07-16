import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {
  StyledView,
  StyledImage,
  StyledText,
  StyledImageBackground,
  StyledModal
} from '../components/styled'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { updatePostStatus, useGetPosts } from '../../../hooks/useAdmin'
import { STATUS } from './constants'
import RBSheet from 'react-native-raw-bottom-sheet'

const PostsManage = () => {
  const navigation = useNavigation()
  const image = {
    uri: 'https://autopro8.mediacdn.vn/134505113543774208/2023/2/7/lamborghini-invencible-4-16756850516461900043085-1675733308714-167573330968768803893.jpg'
  }
  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail', { postId })
  }

  interface Post {
    id: string
    ownerId: string
    title: string
    description: string
    price: number
    categories: string[]
    imageUrls: string[]
    status:
      | 'SOLD'
      | 'AVAILABLE'
      | 'REJECTED'
      | 'RESERVED'
      | 'UNDER REVIEW'
      | 'AWAITING DELETION'
    adminNote: string
    createdAt: string
    updatedAt: string
  }
  const [posts, setPosts] = useState<Post[]>([])

  const { res, error } = useGetPosts()
  useEffect(() => {
    if (res) {
      setPosts(res)
    }
  }, [res])

  const [selectedItem, setSelectedItem] = useState(null)

  const bottomSheetRef = useRef(null)
  const currentPostId = useRef(null)

  const openBottomSheet = (id) => {
    currentPostId.current = id
    bottomSheetRef.current.open()
  }

  const handleUpdateStatus = async (status) => {
    const id = currentPostId.current
    const adminNote = status === 'REJECTED' ? 'Note' : ''
    await updatePostStatus(id, { status, adminNote })

    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, status } : post
    )
    setPosts(updatedPosts)
  }

  const CardPost = ({ post }: { post: Post }) => {
    return (
      <StyledView>
        <TouchableOpacity onPress={() => handlePostPress(post.id)}>
          <StyledView className='h-56 w-[90%] mx-[5%] my-[5%] rounded-2xl overflow-hidden'>
            <StyledImageBackground className='flex-1' source={image}>
              <StyledImage
                source={{
                  uri: 'https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000'
                }}
                className='w-12 h-12 rounded-full m-4'
                style={{
                  borderWidth: 2,
                  borderColor: 'white'
                }}
              />
              <StyledText
                numberOfLines={1}
                className='text-white text-lg font-bold m-4 mb-1 mt-14 pt-1 underline underline-offset-8 w-[90%] truncate ...'
              >
                {post.title}
              </StyledText>
              <StyledView className='flex flex-row mx-2'>
                {post.categories.map((category) => {
                  return (
                    <StyledView className=' py-2 px-4 mx-2 bg-slate-100 rounded-xl opacity-80'>
                      <StyledText>{category}</StyledText>
                    </StyledView>
                  )
                })}
              </StyledView>
            </StyledImageBackground>
          </StyledView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(post.id)

            setTimeout(() => {
              openBottomSheet(post.id)
            }, 50)
          }}
        >
          <StyledView className='flex flex-row self-center gap-4 mb-[5%]'>
            <StyledView className='bg-blue-500 py-2 items-center rounded-lg p-2'>
              <StyledText className='font-semibold text-white'>
                {post.status}
              </StyledText>
            </StyledView>
          </StyledView>
        </TouchableOpacity>
        <RBSheet
          ref={bottomSheetRef}
          height={200}
          closeOnDragDown={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }
          }}
        >
          <ScrollView>
            {Object.values(STATUS).map((status) => {
              const postCheck = posts.find((post) => post.id === selectedItem)
              return (
                <TouchableOpacity
                  key={status.value}
                  onPress={() => {
                    handleUpdateStatus(status.value)
                  }}
                >
                  <StyledView
                    className={` border-b-[1px] p-2 ${
                      status.value === postCheck?.status
                        ? `bg-slate-400 `
                        : `bg-white`
                    } border-gray-400 `}
                  >
                    <StyledText className='text-xl'>{status.label}</StyledText>
                  </StyledView>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </RBSheet>
      </StyledView>
    )
  }

  return (
    <ScrollView>
      {posts.map((post) => {
        return <CardPost post={post} />
      })}
    </ScrollView>
  )
}

export default PostsManage
