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
    <TouchableOpacity className="mx-1" onPress={()=>setSelected(item.id)}>
        {selected===item.id?
      <View className="w-[60px] h-[30px] bg-[#161616] flex justify-center items-center rounded-2xl">
        <Text className="text-white">{item.name}</Text>
      </View>
      :
      <View className="w-[60px] h-[30px] bg-[#ffffff] flex justify-center items-center rounded-2xl border border-[#d9d9d9]">
      <Text className="text-[#d9d9d9]">{item.name}</Text>
    </View>
      }
    </TouchableOpacity>
  );
};

export default TagCate;
