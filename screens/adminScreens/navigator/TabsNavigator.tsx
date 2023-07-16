import { View, Text } from "react-native";
import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomBottomTabs from "../components/CustomBottomTabs";
import HomePage from "../Homepage";
import BookingsMoanage from "../BookingsManage";
import TransactionManage from "../TransManage";
import PostsManage from "../PostsManage";
import UsersManage from "../UsersManage";
import PostDetail from "../PostsManage/PostDetail";

export type TabsStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Homepage: undefined;
  BookingsManage: undefined;
  TransManage: undefined;
  PostsManage: undefined;
  UsersManage: undefined;
};
export type PostStackParamList = {
  PostsManage: undefined;
  PostDetail: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const PostStack = createNativeStackNavigator<PostStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const MyPostStack = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="PostsManage" component={PostsManage} />
      <PostStack.Screen name="PostDetail" component={PostDetail} />
    </PostStack.Navigator>
  );
};

const MyHomeStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: route.name === "PostsManage" ? false : true,
      })}
    >
      <HomeStack.Screen name="Homepage" component={HomePage} />
      <HomeStack.Screen name="BookingsManage" component={BookingsMoanage} />
      <HomeStack.Screen name="TransManage" component={TransactionManage} />
      <HomeStack.Screen name="PostsManage" component={MyPostStack} />
      <HomeStack.Screen name="UsersManage" component={UsersManage} />
    </HomeStack.Navigator>
  );
};

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: route.name === "Home" ? false : true,
      })}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabsStack.Screen
        name="Home"
        component={MyHomeStack}
        options={{
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />

      <TabsStack.Screen
        name="Profile"
        component={Example}
        options={{
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;

const Example = () => {
  return <View />;
};
