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

interface Post {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  status:
    | "SOLD"
    | "AVAILABLE"
    | "REJECTED"
    | "RESERVED"
    | "UNDER REVIEW"
    | "AWAITING DELETION";
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

  const [post, setPost] = useState<Post | null>(null);
  // useEffect(() => {
  //   const fetchPost = (postId) => {
  //     const url = `https://showroom.ttq186.dev/posts/${postId}`;

  //     axios.defaults.headers.common["Authorization"] =
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiM2U4NWI2OTMtZWQzZS00OGUzLWFmODMtMjQzMTA2YzU1ZGVkIiwiZXhwIjoxNjg4NDYxNTg1LCJyb2xlIjoiQURNSU4iLCJpc19hY3RpdmUiOnRydWUsImlzX2FjdGl2YXRlZCI6dHJ1ZX0.p3AQnofxn9Ir60gRccrNfe6Em-rXhBsnjt0408ItuzU";

  //     axios
  //       .get(url)
  //       .then((response) => {
  //         setPost(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   fetchPost(postId);
  // }, []);

  console.log(post);

  return (
    <ScrollView>
      <StyledView className="flex flex-row m-5">
        <StyledImage
          source={{
            uri: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/322115926_1204139193874845_7113739806147074311_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IGJi6I88w_8AX_Q8iFL&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfDBM1tnOOCUdAtAm_SWmr318JP7oNtHGKc8gGISpRo9bA&oe=649E546A",
          }}
          className="w-16 h-16 rounded-full align-middle"
        />
        <StyledView className=" items-left justify-end pl-2 ">
          <StyledText className="font-semibold text-lg pb-2">
            Trần Quang Thiện
          </StyledText>
          <StyledText className="text-base">1d</StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="px-5">
        <SeeMore numberOfLines={2}>
          This work seeks to provide a working report on the enunciation of a
          start-up car showroom with servicing and repair facilities in the
          country.
        </SeeMore>
      </StyledView>
      <ImageGallery images={images} />
    </ScrollView>
  );
};

export default PostDetail;
