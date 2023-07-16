import { Iproduct } from "../mockData/products";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "../tailwinds/tailwindComponent";
import React from "react";
import Icons from "@expo/vector-icons/MaterialIcons";




export interface Props {
  product: Iproduct;
  i: number;
  navigation: any;
}



const CardBook = ({ product, i, navigation }: Props) => {
  return (
    <TouchableOpacity
      className={`flex-row h-[175px] w-[93%] mx-auto mb-4 relative   `}
      onPress={() => navigation.navigate("Details", { id: product.id })}
    >
      <Image
        className="h-full w-[50%] object-cover rounded-l-2xl"
        source={{ uri: product.URL[0] }}
      />

     <View className="h-full w-[50%] bg-slate-200 rounded-r-2xl  flex relative pl-2 ">
        <Text className=" text-xl font-semibold">{product.name}</Text>
        <Text className="text-base">${product.price}</Text>
        <Text className=" text-lg mt-3 text-[#000000] h-[40%] overflow-hidden">2023/07/21 00:05</Text>
        <View className="absolute bottom-0 flex-row justify-end w-full mb-2 mr-2">
           
            <TouchableOpacity className="z-10 w-[40px] h-[40px] bg-[#ffffff] flex justify-center items-center rounded-full ml-2">
                <Icons name="payment" size={25}/>
            </TouchableOpacity>
           
            <TouchableOpacity className="z-10 w-[100px] h-[40px] bg-white flex-row justify-center items-center rounded-full ml-2">
            <Text className="mr-1">Cancel</Text>
                <Icons name="pending-actions" size={25}/>
            </TouchableOpacity>
        </View>
     </View>
    </TouchableOpacity>
  );
};



export default CardBook;
