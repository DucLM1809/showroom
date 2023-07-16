import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  StyledView,
  StyledText,
  StyledImage,
  StyledTouchableOpacity,
} from "../components/styled";
import SeeMore from "react-native-see-more-inline";
import ImageGallery from "../components/ImageGallery";
import axios from "axios";
import { useGetPosts } from "../../../hooks/useAdmin";

interface Post {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  categories: string[];
  imageUrls: string[];
  status:
    | "SOLD"
    | "AVAILABLE"
    | "REJECTED"
    | "RESERVED"
    | "UNDER REVIEW"
    | "AWAITING DELETION";
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}

const PostDetail = ({ navigation, route }) => {
  const images = [
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
    "https://static-images.vnncdn.net/files/publish/2023/2/7/anh-1-948.jpg",
  ];
  const { postId } = route.params;
  const { res, error } = useGetPosts();
  const filteredPost: Post = res.find((item) => item.id === postId);
  console.log(filteredPost);
  const postDescription = filteredPost?.description ?? "";

  return (
    <ScrollView>
      <StyledView className="flex flex-row m-5">
        <StyledImage
          source={{
            uri: "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
          }}
          className="w-16 h-16 rounded-full align-middle"
        />
        <StyledView className=" items-left justify-end pl-2 ">
          <StyledText className="font-semibold text-base pb-2">
            Anonymous
          </StyledText>
          <StyledText className="text-base">1d</StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="px-5">
        <SeeMore
          style={{
            fontSize: 18,
          }}
          numberOfLines={2}
        >
          {postDescription}
        </SeeMore>
      </StyledView>
      <ImageGallery images={images} />
    </ScrollView>
  );
};

export default PostDetail;
