import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../slices/rootReducer";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../../slices/usersSlice";
import axios from "axios";
import { StyledView, StyledImage, StyledText } from "../components/styled";

interface User {
  id: number;
  name: string;
  address: {
    street: string;
  };
  phone: string;
}

const UsersManage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const error = useSelector((state: RootState) => state.user.error);
  const [activeButton, setActiveButton] = useState<string>("owners");

  useEffect(() => {
    dispatch(fetchUsersRequest());

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

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
            uri: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/322115926_1204139193874845_7113739806147074311_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IGJi6I88w_8AX_Q8iFL&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfDBM1tnOOCUdAtAm_SWmr318JP7oNtHGKc8gGISpRo9bA&oe=649E546A",
          }}
          className="w-32 h-32 rounded-full align-middle m-5"
        />
        <StyledView className="justify-center gap-2">
          <StyledText
            numberOfLines={1}
            className="font-bold text-xl truncate ... max-w-[80%]"
          >
            {user.name}
          </StyledText>
          <StyledText
            numberOfLines={1}
            className="font-medium text-lg truncate ... max-w-[80%]"
          >
            {user.address.street} Street
          </StyledText>
          <StyledText className="text-base">{user.phone}</StyledText>
        </StyledView>
      </StyledView>
    );
  };

  return (
    <ScrollView>
      <StyledView className="flex flex-row mx-2 mt-5">
        <TouchableOpacity onPress={() => setActiveButton("owners")}>
          <StyledView
            className={`bg-${
              activeButton === "owners" ? "blue" : "white"
            }-500 px-4 py-2 align-middle rounded-3xl mx-3 border border-blue-500`}
          >
            <StyledText
              className={`${
                activeButton === "owners" ? "text-white" : "text-blue-500"
              } text-xl font-normal`}
            >
              Owners
            </StyledText>
          </StyledView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveButton("customers")}>
          <StyledView
            className={`${
              activeButton === "customers" ? "bg-blue-500" : "bg-white"
            } px-4 py-2 align-middle rounded-3xl mx-3 border border-blue-500`}
          >
            <StyledText
              className={`${
                activeButton === "customers" ? "text-white" : "text-blue-500"
              } text-xl font-normal`}
            >
              Customers
            </StyledText>
          </StyledView>
        </TouchableOpacity>
      </StyledView>
      {activeButton === "owners" && (
        <>
          {users
            .filter((user) => user.id % 2 !== 0)
            .map((filteredUser) => (
              <CardUser user={filteredUser} key={filteredUser.id} />
            ))}
        </>
      )}
      {activeButton === "customers" && (
        <>
          {users
            .filter((user) => user.id % 2 === 0)
            .map((filteredUser) => (
              <CardUser user={filteredUser} key={filteredUser.id} />
            ))}
        </>
      )}
    </ScrollView>
  );
};

export default UsersManage;
