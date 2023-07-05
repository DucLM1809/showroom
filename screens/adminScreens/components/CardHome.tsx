import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Divider } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { StyledView, StyledText } from "./styled";

interface CardProps {
  title: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

const CardHome: React.FC<CardProps> = ({
  title,
  name,
  amount,
  icon,
  color,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(name);
  };
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <StyledView className="w-[80%] mx-[10%] bg-white h-32 p-4 rounded-lg mb-4 ">
        <StyledView className="flex flex-row">
          <StyledView className=" mt-1">
            <MaterialIcons
              name={icon}
              color={color}
              style={{
                fontSize: 50,
              }}
            />
          </StyledView>
          <StyledView className="flex-1 items-end">
            <StyledText className="text-lg font-bold ">{title}</StyledText>

            <StyledView className="flex flex-row items-center gap-2">
              <StyledText className="text-2xl">{amount}</StyledText>

              <Text>Today</Text>
            </StyledView>
          </StyledView>
        </StyledView>
        <Divider style={{ marginVertical: 5 }} color="grey" />
        <StyledView className="flex-row justify-between pt-2">
          <StyledText className="font-bold self-end">View</StyledText>
          <StyledText className="font-bold">Add </StyledText>
        </StyledView>
      </StyledView>
    </TouchableOpacity>
  );
};

export default CardHome;
