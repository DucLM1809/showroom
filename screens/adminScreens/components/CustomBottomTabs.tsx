import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { ParamListBase, useTheme } from "@react-navigation/native";
import { StyledView, StyledText } from "./styled";

const CustomBottomTabs = (props: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.card }}>
      <StyledView className="flex flex-row items-center px-4">
        {props.state.routes.map((route, i) => {
          const isActive = i == props.state.index;
          return (
            <TabItem
              key={i}
              isActive={isActive}
              routeName={route.name}
              navigation={props.navigation}
            />
          );
        })}
      </StyledView>
    </SafeAreaView>
  );
};

export default CustomBottomTabs;

const TabItem = ({
  routeName,
  isActive,
  navigation,
}: {
  routeName: string;
  isActive: boolean;
  navigation: any;
}) => {
  const { colors } = useTheme();

  const onTap = () => {
    navigation.navigate(routeName);
  };

  return (
    <Pressable
      onPress={onTap}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 8,
      }}
    >
      <StyledView
        className={`w-9 h-9 items-center justify-center rounded-full ${
          isActive ? "bg-[#3c82f6]" : "bg-white"
        }`}
      >
        <Icons
          name={
            routeName === "Home"
              ? "home"
              : routeName === "Wishlist"
              ? "list"
              : routeName === "Payment"
              ? "account-balance-wallet"
              : "person"
          }
          size={24}
          color={isActive ? colors.card : colors.text}
          style={{
            opacity: isActive ? 1 : 0.5,
          }}
        />
      </StyledView>
      {/* {isActive && (
        <Text
          style={{
            marginLeft: 4,
            fontSize: 12,
            fontWeight: "600",
            color: colors.text,
          }}
        >
          {routeName}
        </Text>
      )} */}
    </Pressable>
  );
};
