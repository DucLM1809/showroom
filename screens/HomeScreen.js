import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TabsNavigator from "../navigators/TabsNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import CardSmall from "../components/CardSmall";
import { allProduct, hotProduct } from "../mockData/products";
import { categories } from "../mockData/category";
import TagCate from "../components/TagCate";
import MasonryList from "@react-native-seoul/masonry-list";
import CardCate from "../components/CardCate";
import { Modal, TextInput } from "../tailwinds/tailwindComponent";
import ModalBooking from "../components/ModalBooking";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [selectedCate, setSelectedCate] = useState(categories[0].id);
  const [modalVisible,setModalVisible] = useState(false)
  const [bookingProduct, setBookingProduct] = useState({})

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <TouchableOpacity className="mt-2 ml-3">
            <Icons name="menu" size={36} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity className=" flex-1, h-[52px] flex-row border rounded-[52px] border-[#d9d9d9] items-center px-[24px] mx-4 my-4">
            <Icons name="search" size={24} color={colors.border} />
            <TextInput placeholder="Search" placeholderTextColor={'#d9d9d9'} className="text-[#d9d9d9]"/>
          </TouchableOpacity>
        </View>

        {/* HOT */}
        <View className="my-1">
          <View className="">
            <View className="flex-row justify-between px-5 items-end">
              <Text className="text-xl font-bold">New Products</Text>
              <TouchableOpacity>
                <Text>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row mt-2 h-[150px]  px-2">
            <View className="flex w-[55%]">
              <CardSmall {...hotProduct[0]} />
            </View>

            <View className="flex w-[40%] flex-col justify-between ml-3">
              <View className="h-[47%]">
                <CardSmall {...hotProduct[1]} />
              </View>
              <View className="h-[47%]">
                <CardSmall {...hotProduct[2]} />
              </View>
            </View>
          </View>
        </View>

        {/* CATE */}

        <View className="my-3">
          <View className="">
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={categories}
              horizontal
              renderItem={({ item }) => (
                <TagCate
                  item={item}
                  selected={selectedCate}
                  setSelected={setSelectedCate}
                ></TagCate>
              )}
            />
          </View>
          <View >
          <ScrollView className="flex mt-2  px-2 w-full ">
            <MasonryList
              data={allProduct}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item,i }) => <CardCate setBookingProduct={setBookingProduct} setModalVisible={setModalVisible} product={item} i={i} navigation={navigation}/>}
              onEndReachedThreshold={0.1}
              
            />
            
          </ScrollView>
          </View>
        </View>
        <ModalBooking modalVisible={modalVisible} setModalVisible={setModalVisible} product={bookingProduct} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
