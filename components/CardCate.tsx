import { Iproduct } from "../mockData/products";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from "../tailwinds/tailwindComponent";
import React from "react";
import Icons from "@expo/vector-icons/MaterialIcons";

export interface Props {
  product: Iproduct;
  i: number;
  navigation: any;
  setModalVisible: any;
  setBookingProduct: any;
}

const CardCate = ({
  product,
  i,
  navigation,
  setModalVisible,
  setBookingProduct,
}: Props) => {
  return (
    <TouchableOpacity
      className={`flex ${
        i == 0 ? "h-[200px]" : "h-[250px]"
      }  w-[93%] mx-auto mb-4 relative `}
      onPress={() => navigation.navigate("Details", { product: product })}
    >
      <Image
        className="h-full object-cover rounded-2xl"
        source={{ uri: product.URL[0] }}
      />

      <View className=" absolute top-0 left-0 w-full h-[40px] bg-[#01010145]   rounded-t-2xl flex justify-between items-center flex-row px-3">
        <Text className=" text-xl font-semibold text-white w-[70%]">
          {product.name}
        </Text>
        <TouchableOpacity className=" bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center">
          <Icons name="favorite-outline" size={20} color={"#000"} />
        </TouchableOpacity>
      </View>

      <View className=" absolute bottom-2 left-[3%] w-[94%] h-[50px] bg-[#010101cd]  rounded-3xl flex justify-between items-center flex-row px-3">
        <Text className=" text-md font-semibold text-white w-[70%]">
          {product.price}$
        </Text>
        {/* <Text className=' text-md font-semibold text-white'>{product.price}</Text> */}
        <TouchableOpacity
          className=" bg-white w-[30%] h-[30px] rounded-full flex justify-center items-center"
          onPress={() => {
            setModalVisible(true);
            setBookingProduct(product);
          }}
        >
          <Icons name="pending-actions" size={20} color={"#000"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardCate;
