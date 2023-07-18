import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  StyledView,
  StyledImage,
  StyledText,
  StyledImageBackground,
  StyledModal,
  StyledPressable,
} from "../components/styled";
import { useNavigation } from "@react-navigation/native";
import { updatePostStatus, useGetPosts } from "../../../hooks/useAdmin";
import { STATUS } from "./constants";
import RBSheet from "react-native-raw-bottom-sheet";

const PostsManage = () => {
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
    categories: string[];
    imageUrls: string[];
    status:
      | "SOLD"
      | "AVAILABLE"
      | "DELETE_REJECTED"
      | "REVIEW_REJECTED"
      | "RESERVED"
      | "UNDER REVIEW"
      | "AWAITING DELETION";
    adminNote: string;
    createdAt: string;
    updatedAt: string;
  }
  const [posts, setPosts] = useState<Post[]>([]);

  const { res, error, fetchPosts } = useGetPosts();

  useEffect(() => {
    if (res) {
      setPosts(res);
    }
  }, [res]);

  const [selectedItem, setSelectedItem] = useState(null);

  const bottomSheetRef = useRef(null);
  const currentPostId = useRef(null);

  const openBottomSheet = (id) => {
    currentPostId.current = id;
    bottomSheetRef.current.open();
  };

  const [isViewNote, setIsViewNote] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [postStatus, setPostStatus] = useState("");

  const handleChangeStatus = async (id, status, adminNote) => {
    await updatePostStatus(id, { status, adminNote });

    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, status } : post
    );
    setPosts(updatedPosts);
    setIsViewNote(false);
    fetchPosts();
    setAdminNote("");
  };

  const handleUpdateStatus = async (status) => {
    const id = currentPostId.current;
    if (status === "REVIEW_REJECTED" || status === "DELETE_REJECTED") {
      setPostStatus(status);
      setIsViewNote(true);
    } else {
      handleChangeStatus(id, status, adminNote);
    }
  };

  const CardPost = ({ post }: { post: Post }) => {
    return (
      <StyledView
        style={{
          marginBottom: -20,
        }}
      >
        <TouchableOpacity onPress={() => handlePostPress(post.id)}>
          <StyledView className="h-56 w-[90%] mx-[5%] my-[5%] rounded-2xl overflow-hidden">
            <StyledImageBackground className="flex-1" source={image}>
              <StyledImage
                source={{
                  uri: "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
                }}
                className="w-12 h-12 rounded-full m-4"
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                }}
              />
              <StyledText
                numberOfLines={1}
                className="text-white text-lg font-bold m-4 mb-1 mt-14 pt-1 underline underline-offset-8 w-[90%] truncate ..."
              >
                {post.title}
              </StyledText>
              <StyledView className="flex flex-row mx-2">
                {post.categories.map((category) => {
                  return (
                    <StyledView className=" py-2 px-4 mx-2 bg-slate-100 rounded-xl opacity-80">
                      <StyledText>{category.name}</StyledText>
                    </StyledView>
                  );
                })}
              </StyledView>
            </StyledImageBackground>
          </StyledView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(post.id);

            setTimeout(() => {
              openBottomSheet(post.id);
            }, 50);
          }}
        >
          <StyledView className="flex flex-row self-center">
            <StyledView className="bg-blue-500 py-2 items-center rounded-lg p-2">
              <StyledText className="font-semibold text-white">
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
              borderTopRightRadius: 10,
            },
          }}
        >
          <ScrollView>
            {Object.values(STATUS).map((status) => {
              const postCheck = posts.find((post) => post.id === selectedItem);
              return (
                <TouchableOpacity
                  key={status.value}
                  onPress={() => {
                    handleUpdateStatus(status.value);
                  }}
                >
                  <StyledView
                    className={` border-b-[1px] p-2 ${
                      status.value === postCheck?.status
                        ? `bg-slate-400 `
                        : `bg-white`
                    } border-gray-400 `}
                  >
                    <StyledText className="text-xl">{status.label}</StyledText>
                  </StyledView>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </RBSheet>
        <StyledView className="flex-1 items-center mt-10 justify-center">
          <Modal
            animationType="slide"
            transparent={true}
            visible={isViewNote}
            onRequestClose={() => {
              setIsViewNote(!isViewNote);
            }}
          >
            <StyledView className="flex-1 justify-center items-center mt-10">
              <StyledView style={styles.modalView}>
                <StyledText className="align-middle mb-3 text-base">
                  Admin Note
                </StyledText>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setAdminNote(text)}
                  value={adminNote}
                  placeholder="Enter admin note"
                />

                <StyledView className="flex flex-row">
                  <StyledPressable
                    disabled={adminNote === ""}
                    className={`rounded-lg mx-2 p-2 shadow-md ${
                      adminNote === "" ? "bg-blue-200" : "bg-blue-500"
                    }`}
                    onPress={() => {
                      setIsViewNote(false);
                      handleChangeStatus(selectedItem, postStatus, adminNote);
                    }}
                  >
                    <StyledText className="align-middle font-bold text-white">
                      Submit
                    </StyledText>
                  </StyledPressable>
                  <StyledPressable
                    className={`rounded-lg p-2 shadow-md mx-2 bg-red-500`}
                    onPress={() => {
                      setIsViewNote(false);
                      setAdminNote("");
                    }}
                  >
                    <StyledText className="align-middle font-bold text-white">
                      Cancel
                    </StyledText>
                  </StyledPressable>
                </StyledView>
              </StyledView>
            </StyledView>
          </Modal>
        </StyledView>
      </StyledView>
    );
  };

  return (
    <ScrollView>
      {posts?.map((post, index) => {
        return <CardPost key={post?.id || index} post={post} />;
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PostsManage;
