import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  StyledView,
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
} from "../components/styled";
import { updateUserStatus, useGetUsers } from "../../../hooks/useAdmin";

interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  isActivated: boolean;
}

const UsersManage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeButton, setActiveButton] = useState<string>("Activated");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [userStatus, setUserStatus] = useState();

  const { response, error } = useGetUsers();
  useEffect(() => {
    if (response) {
      const filterRes = response.filter((res) => res.role != "ADMIN");
      setUsers(filterRes);
    }
  }, [response]);
  const toggleModal = (id, status) => {
    setIsVisibleModal(!isVisibleModal);
    setUserSelected(id);
    setUserStatus(status);
  };

  const handleUpdateStatus = async (id, status) => {
    if (status === true) {
      toggleModal(id, status);
    } else {
      handleChangeStatus(id, status);
    }
  };

  const handleChangeStatus = async (id, status) => {
    await updateUserStatus(id, !status);
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isActive: !status } : user
    );
    setUsers(updatedUsers);
  };

  const ModalConfirm = ({ id, status }) => {
    return (
      <Modal animationType="fade" transparent={true} visible={isVisibleModal}>
        <View style={styles.modal}>
          <StyledText>Do you want to disable this user?</StyledText>
          <StyledView style={styles.contentModal}>
            <Pressable
              style={styles.buttonModal}
              onPress={() => {
                setIsVisibleModal(false);
                handleChangeStatus(id, status);
              }}
            >
              <StyledText
                style={{
                  fontWeight: "600",
                }}
              >
                Yes
              </StyledText>
            </Pressable>
            <Pressable
              style={styles.buttonModal}
              onPress={() => {
                setIsVisibleModal(false);
              }}
            >
              <StyledText
                style={{
                  fontWeight: "600",
                }}
              >
                No
              </StyledText>
            </Pressable>
          </StyledView>
        </View>
      </Modal>
    );
  };

  const CardUser = ({ user }: { user: User }) => {
    return (
      <StyledView
        className="bg-white w-[90%] m-[5%] rounded-3xl flex flex-row"
        style={{
          shadowColor: "#3c82f6",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        key={user.id}
      >
        <StyledImage
          source={{
            uri: user.avatarUrl
              ? user.avatarUrl
              : "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
          }}
          className="w-32 h-32 rounded-full align-middle m-5"
        />
        <StyledView className="justify-center gap-2">
          <StyledText
            numberOfLines={1}
            className="font-bold text-xl truncate ... max-w-[80%]"
          >
            {user.fullName ? user.fullName : "Anonymous"}
          </StyledText>
          <StyledText
            numberOfLines={1}
            className="font-medium text-lg truncate ... max-w-[70%]"
          >
            {user.email}
          </StyledText>
          <StyledTouchableOpacity
            onPress={() => {
              handleUpdateStatus(user.id, user.isActive);
            }}
          >
            <StyledView
              className={`${
                user.isActive === true ? "bg-red-500" : "bg-blue-500"
              }  py-2 items-center rounded-lg p-2 w-28`}
            >
              <StyledText className="text-base font-semibold text-white">
                {user.isActive ? "Disable" : "Enable"}
              </StyledText>
            </StyledView>
          </StyledTouchableOpacity>
        </StyledView>
        {isVisibleModal && (
          <ModalConfirm id={userSelected} status={userStatus} />
        )}
      </StyledView>
    );
  };

  return (
    <ScrollView>
      <StyledView className="flex flex-row mx-2 mt-5">
        <TouchableOpacity onPress={() => setActiveButton("Activated")}>
          <StyledView
            className={`bg-${
              activeButton === "Activated" ? "blue" : "white"
            }-500 px-4 py-2 align-middle rounded-3xl mx-3 border border-blue-500`}
          >
            <StyledText
              className={`${
                activeButton === "Activated" ? "text-white" : "text-blue-500"
              } text-xl font-normal`}
            >
              Active
            </StyledText>
          </StyledView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveButton("unActivated")}>
          <StyledView
            className={`${
              activeButton === "unActivated" ? "bg-blue-500" : "bg-white"
            } px-4 py-2 align-middle rounded-3xl mx-3 border border-blue-500`}
          >
            <StyledText
              className={`${
                activeButton === "unActivated" ? "text-white" : "text-blue-500"
              } text-xl font-normal`}
            >
              inActive
            </StyledText>
          </StyledView>
        </TouchableOpacity>
      </StyledView>
      {activeButton === "Activated" && (
        <>
          <>
            {users
              .filter((user) => user.isActive === true)
              .map((filteredUser) => (
                <CardUser user={filteredUser} key={filteredUser.id} />
              ))}
          </>
        </>
      )}
      {activeButton === "unActivated" && (
        <>
          {users
            .filter((user) => user.isActive === false)
            .map((filteredUser) => (
              <CardUser user={filteredUser} key={filteredUser.id} />
            ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    marginTop: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    width: 70,
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2196F3",
  },
  contentModal: {
    flexDirection: "row",
    gap: 15,
    marginTop: 16,
  },
});

export default UsersManage;
