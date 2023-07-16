import React from "react";
import { CATEGORY, Icategory } from "../mockData/category";
import { Text, TouchableOpacity, View } from "../tailwinds/tailwindComponent";

export interface Props {
  item: Icategory;
  selected: string;
  setSelected: any;
}

const TagCate = ({ item, selected, setSelected }: Props) => {
  return (
    <TouchableOpacity className="mx-1" onPress={()=>{
      selected===item.id ?
      setSelected(0):
      setSelected(item.id)
    }}>
        {selected===item.id?
      <View className="w-[90px] h-[30px] bg-[#161616] flex justify-center items-center rounded-2xl">
        <Text className="text-white">{item.name}</Text>
      </View>
      :
      <View className="w-[90px] h-[30px] bg-[#ffffff] flex justify-center items-center rounded-2xl border border-[#b3b3b3]">
      <Text className="text-[#b3b3b3]">{item.name}</Text>
    </View>
      }
    </TouchableOpacity>
  );
};

export default TagCate;
