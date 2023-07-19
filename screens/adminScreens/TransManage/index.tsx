import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledImage
} from '../components/styled'
import { useGetPayments } from '../../../hooks/useAdmin'
import Popover, { PopoverPlacement } from 'react-native-popover-view'

interface User {
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatarUrl: string
}

interface Post {
  title: string
  imageUrls: string[]
}

interface Payment {
  id: string
  userId: string
  user: User
  postId: string
  post: Post
  amount: number
}

const TransactionManage = () => {
  const [payments, setPayments] = useState<Payment[]>([])

  const { response, error } = useGetPayments()
  useEffect(() => {
    if (response) {
      setPayments(response)
    }
  }, [response])

  const CardTransactions = ({ payment }: { payment: Payment }) => {
    console.log(payment)

    return (
      <TouchableOpacity>
        <StyledView className='flex flex-row'>
          <StyledImage
            source={{
              uri: payment.post.imageUrls
                ? payment.post.imageUrls[0]
                : 'https://autopro8.mediacdn.vn/134505113543774208/2023/2/7/lamborghini-invencible-4-16756850516461900043085-1675733308714-167573330968768803893.jpg'
            }}
            className='w-16 h-16 rounded-3xl align-middle mt-5 mb-2 '
          />
          <StyledView className='flex justify-center mx-3 basis-2/7'>
            <StyledView>
              <StyledText className='text-lg font-semibold'>
                {payment.post.title}
              </StyledText>
            </StyledView>

            <StyledView>
              <StyledText>{payment.user.email}</StyledText>
            </StyledView>
          </StyledView>
          <StyledView className='flex justify-center '>
            <Popover
              placement={PopoverPlacement.BOTTOM}
              from={
                <TouchableOpacity>
                  <StyledText
                    numberOfLines={1}
                    className='text-lg font-semibold w-[80%] truncate ... pl-2'
                  >
                    ${payment.amount}
                  </StyledText>
                </TouchableOpacity>
              }
            >
              <StyledText numberOfLines={1} className='text-lg font-semibold '>
                ${payment.amount}
              </StyledText>
            </Popover>
          </StyledView>
        </StyledView>
      </TouchableOpacity>
    )
  }

  return (
    <StyledView className='w-[90%] m-[5%] flex-1'>
      <StyledText className='text-xl font-bold pt-4'>
        Currently Users
      </StyledText>
      <ScrollView horizontal style={{ maxHeight: 140 }}>
        {payments.map((payment) => (
          <StyledView className='items-center mr-8'>
            <StyledImage
              source={{
                uri: payment?.user?.avatarUrl
                  ? payment?.user?.avatarUrl
                  : 'https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000'
              }}
              className='w-20 h-20 rounded-xl align-middle  mt-5 mb-2 '
            />
            <StyledText numberOfLines={1} className='font-medium'>
              {payment.user.fullName ? payment.user.fullName : 'Anonymous'}
            </StyledText>
          </StyledView>
        ))}
      </ScrollView>
      <StyledText className='text-xl font-bold pt-4'> Transactions</StyledText>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {payments?.map((payment) => {
          return <CardTransactions payment={payment} />
        })}
      </ScrollView>
    </StyledView>
  )
}

export default TransactionManage
