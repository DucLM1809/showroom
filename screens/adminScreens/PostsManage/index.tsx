import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  StyledView,
  StyledImage,
  StyledText,
  StyledImageBackground,
} from "../components/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../slices/rootReducer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PostsManage = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const navigation = useNavigation();
  const image = {
    uri: "https://autopro8.mediacdn.vn/134505113543774208/2023/2/7/lamborghini-invencible-4-16756850516461900043085-1675733308714-167573330968768803893.jpg",
  };
  const handlePostPress = (postId: string) => {
    navigation.navigate("PostDetail", { postId });
  };

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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("https://showroom.ttq186.dev/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const CardPost = ({ post }: { post: Post }) => {
    return (
      <StyledView>
        <TouchableOpacity onPress={() => handlePostPress(post.id)}>
          <StyledView className="h-56 w-[90%] mx-[5%] my-[5%] rounded-2xl overflow-hidden">
            <StyledImageBackground className="flex-1" source={image}>
              <StyledImage
                source={{
                  uri: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/322115926_1204139193874845_7113739806147074311_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IGJi6I88w_8AX_Q8iFL&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfDBM1tnOOCUdAtAm_SWmr318JP7oNtHGKc8gGISpRo9bA&oe=649E546A",
                }}
                className="w-12 h-12 rounded-full m-4"
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                }}
              />
              <StyledText
                numberOfLines={1}
                className="text-white text-lg font-bold m-4 mt-24 pt-1 underline underline-offset-8 w-[90%] truncate ..."
              >
                {post.title}
              </StyledText>
            </StyledImageBackground>
          </StyledView>
        </TouchableOpacity>
        <StyledView className="flex flex-row self-center gap-4 mb-[5%]">
          <StyledView className="bg-blue-500 py-2 items-center rounded-lg w-20">
            <StyledText className="font-semibold text-white">
              Approve
            </StyledText>
          </StyledView>
          <StyledView className="bg-red-500 py-2 items-center rounded-lg w-20">
            <StyledText className="font-semibold text-white">Deny</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    );
  };
  return (
    <ScrollView>
      {posts.map((post) => {
        return <CardPost post={post} />;
      })}
    </ScrollView>
  );
};

export default PostsManage;
