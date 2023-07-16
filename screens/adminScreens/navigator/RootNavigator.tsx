import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import BookingsMoanage from "../BookingsManage";
import { SCREEN } from "../../../constants/screen";
import StarterScreen from "../../StarterScreen";
import SignInScreen from "../../SignInScreen";
import SignUpScreen from "../../SignUpScreen";

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  StarterScreen: NavigatorScreenParams<TabsStackParamList>;
  SignUpScreen: NavigatorScreenParams<TabsStackParamList>;
  SignInScreen: NavigatorScreenParams<TabsStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="StarterScreen" component={StarterScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
