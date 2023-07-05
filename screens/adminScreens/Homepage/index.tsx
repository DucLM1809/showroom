import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

import CardHome from "../components/CardHome";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../navigator/TabsNavigator";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
} from "../components/styled";

const HomePage = ({ navigation }: TabsStackScreenProps<"Home">) => {
  const data = [
    {
      title: "Orders Management",
      name: "OrdersManage",
      amount: 21,
      icons: "format-list-bulleted",
      color: "black",
    },
    {
      title: "Transactions Management",
      name: "TransManage",
      amount: 30,
      icons: "monetization-on",
      color: "black",
    },
    {
      title: "Posts Management",
      name: "PostsManage",
      amount: 30,
      icons: "post-add",
      color: "black",
    },
    {
      title: "Users Management",
      name: "UsersManage",
      amount: 200,
      icons: "people",
      color: "black",
    },
  ];
  const AVATAR_URL =
    "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
  const { colors } = useTheme();

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        <StyledView className="px-6 flex flex-row items-center gap-2">
          <Image
            source={{
              uri: AVATAR_URL,
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover"
          />
          <StyledView className="flex-1">
            <StyledText
              className="text-lg font-bold mb-2 text-gray-600"
              numberOfLines={1}
            >
              Hi, Admin 👋
            </StyledText>
            <StyledText className="text-gray-600 opacity-75" numberOfLines={1}>
              Manage your application here!
            </StyledText>
          </StyledView>
          <StyledTouchableOpacity className="w-14 h-14 border-2 border-gray-300 items-center justify-center rounded-full">
            <Icons name="notifications" size={24} color={colors.text} />
          </StyledTouchableOpacity>
        </StyledView>

        {data.map((item) => (
          <CardHome
            title={item.title}
            name={item.name}
            amount={item.amount}
            icon={item.icons}
            color={item.color}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePage;
