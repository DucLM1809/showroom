import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useGetCategories, useGetPost } from "../hooks/usePost";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [selectedCate, setSelectedCate] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingProduct, setBookingProduct] = useState({});
  const [postData, setpostData] = useState([])
  const [categoryData, setcategoryData] = useState([{id:0,name:'All'}])
  const [postFilterData, setpostFilterData] = useState([])

  const { handleGetPosts, response: responseGetPost, error } = useGetPost();
  const { handleGetCategories, response: responseGetCategories, error: errorGetCate } = useGetCategories();

  useEffect(() => {
    handleGetPosts({ limit: 20 });
    handleGetCategories();
  }, []);

  useEffect(()=>{
    setFilterData()
  },[postData])

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (responseGetPost) {
      setpostData(responseGetPost)
    }
  }, [responseGetPost, handleGetPosts]);

  useEffect(() => {
    if (errorGetCate) {
      console.log(errorGetCate);
    } else if (responseGetCategories) {
      setcategoryData(responseGetCategories)
    }
  }, [responseGetCategories, handleGetCategories]);

  useEffect(()=>{
    setFilterData()
  },[selectedCate])

  const setFilterData = () =>{
    if(selectedCate===0){
      setpostFilterData(postData)
    } else{
      setpostFilterData(
        postData.filter(o=>o.categories.find(i=>i.id===selectedCate))
      )
      
    }
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <TouchableOpacity className="mt-2 ml-3" onPress={() => {}}>
            <Icons name="menu" size={36} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity className=" flex-1, h-[52px] flex-row border rounded-[52px] border-[#d9d9d9] items-center px-[24px] mx-4 my-4">
            <Icons name="search" size={24} color={colors.border} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={"#d9d9d9"}
              className="text-[#d9d9d9]"
            />
          </TouchableOpacity>
        </View>

        {/* HOT */}
        <View className="my-1">
          <View className="">
            <View className="flex-row justify-between px-5 items-end">
              <Text className="text-xl font-bold">Suggest Products</Text>
              
            </View>
          </View>
          <View className="flex-row mt-2 h-[150px]  px-2">
            <View className="flex w-[55%]">
              <CardSmall product={postData[3]} navigation={navigation} />
            </View>

            <View className="flex w-[40%] flex-col justify-between ml-3">
              <View className="h-[47%]">
                <CardSmall product={postData[1]} navigation={navigation} />
              </View>
              <View className="h-[47%]">
                <CardSmall product={postData[2]} navigation={navigation} />
              </View>
            </View>
          </View>
        </View>

        {/* CATE */}

        <View className="my-3">
          <View className="flex flex-row">
            

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={categoryData}
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
          <View>
            <ScrollView className="flex mt-2  px-2 w-full ">
              
              <MasonryList
                data={postFilterData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }) => (

                  <CardCate
                    setBookingProduct={setBookingProduct}
                    setModalVisible={setModalVisible}
                    product={item}
                    i={i}
                    navigation={navigation}
                  />
                )}
                onEndReachedThreshold={0.1}
              />
            </ScrollView>
          </View>
        </View>
        <ModalBooking
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          product={bookingProduct}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
