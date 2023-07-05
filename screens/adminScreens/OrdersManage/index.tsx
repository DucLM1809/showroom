import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

const OrdersManage = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View>
      <Text>OrdersManage</Text>
    </View>
  );
};

export default OrdersManage;
