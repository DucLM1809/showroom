import { View, Text, FlatList, Animated, Dimensions } from "react-native";
import React,{useState} from "react";
import {
  SafeAreaView,
  withSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image, TouchableOpacity } from "../tailwinds/tailwindComponent";
import Icons from "@expo/vector-icons/MaterialIcons";
import ModalBooking from "../components/ModalBooking";

const DetailScreen = ({ route, navigation }) => {
  const width = Dimensions.get("window").width;
  const product = route.params.product;
  const scrollX = new Animated.Value(0);
  const [modalVisible,setModalVisible] = useState(false)
  const [bookingProduct, setBookingProduct] = useState({})

  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 400,
        }}
      >
        <Image source={{ uri: item }} className="w-full h-full" />
      </View>
    );
  };
  return (
    <SafeAreaView className="h-[100vh]">
      <TouchableOpacity
        className="absolute top-[55px] left-2 z-10 bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center"
        onPress={() => navigation.navigate("TabsStack")}
      >
        <View className=" translate-x-1">
          <Icons name="arrow-back-ios" size={25} />
        </View>
      </TouchableOpacity>
      <View>
        <FlatList
          data={product.URL}
          horizontal
          renderItem={renderProduct}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          className="h-[400]"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
      </View>
      <View className="relative flex">
        <TouchableOpacity className=" absolute top-3 right-3 border-2 rounded-full p-2 z-20" >
          <Icons name="favorite-outline" size={25} />
        </TouchableOpacity>
        <Text className="text-4xl font-semibold ml-2 mt-2">{product.name}</Text>

        <Text className="text-base font-normal ml-2 mt-4">
          {product.description}
        </Text>
        <View className="flex-row px-3 mt-4">
          <View className="bg-[#525050] py-1  px-3 rounded-3xl mr-3  ">
            <Text className="text-white font-semibold text-lg   ">
              {product.category}
            </Text>
          </View>
          <View className="bg-[#525050] py-1  px-3 rounded-3xl   ">
            <Text className="text-white font-semibold text-lg  ">
              {product.category}
            </Text>
          </View>
        </View>
      </View>
      <View className="absolute bottom-0 flex-row justify-between w-[100vw] px-2 items-center">
        <Text className="text-xl font-bold ml-2 ">${product.price}</Text>
        <View className='flex-row'>
        <TouchableOpacity className=" flex-row items-center bg-[#eb2323] rounded-l-full py-2 pr-5 pl-2">
          <View className=" bg-white rounded-full p-2 mr-2">
            <Icons name="payment" size={30} />
          </View>
          <Text className="text-white text-lg ">Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" flex-row items-center bg-[#000000] rounded-r-full py-2 pr-2 pl-5" onPress={()=>{
          setModalVisible(true)
          setBookingProduct(product)
        }}>
          <Text className="text-white text-lg mr-2">Booking</Text>
          <View className=" bg-white rounded-full p-2">
            <Icons name="pending-actions" size={30} />
          </View>
        </TouchableOpacity>
        </View>
        <ModalBooking modalVisible={modalVisible} setModalVisible={setModalVisible} product={bookingProduct} />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
