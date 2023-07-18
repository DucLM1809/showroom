import { Iproduct } from "../mockData/products";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "../tailwinds/tailwindComponent";
import React, { useState } from "react";
import Icons from "@expo/vector-icons/MaterialIcons";

export interface Props {
  product: any;
  i: number;
  navigation: any;
  putWishList: any;
  setModalVisible: any;
  setBookingProduct: any;
  setModalVisiblePurchase: any;
  paid: boolean;
}

const CardFavo = ({
  product,
  i,
  navigation,
  putWishList,
  setModalVisible,
  setBookingProduct,
  setModalVisiblePurchase,
  paid,
}: Props) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const ModalConfirm = (props) => {
    return (
      <Modal animationType="fade" transparent={true} visible={isVisibleModal}>
        <View
          style={{
            zIndex: 9,
            position: "absolute",
            top: 0,
            margin: 20,
            marginTop: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: 140,
          }}
        >
          <Text>Do you want to remove this item from the list?</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={{
                width: 70,
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
                elevation: 2,
                backgroundColor: "#2196F3",
              }}
              onPress={() => {
                putWishList({
                  addedPostIds: [],
                  removedPostIds: [product.id],
                });

                setIsVisibleModal(false);
              }}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: 70,
                alignItems: "center",
                padding: 10,
                elevation: 2,
                backgroundColor: "#2196F3",
              }}
              onPress={() => {
                setIsVisibleModal(false);
              }}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <TouchableOpacity
      className={`flex-row h-[175px] w-[93%] mx-auto mb-4 relative   `}
      onPress={() => navigation.navigate("Details", { id: product.id })}
    >
      <Image
        className="h-full w-[50%] object-cover rounded-l-2xl"
        source={{ uri: product.imageUrls[0] }}
      />

      <View className="h-full w-[50%] bg-slate-200 rounded-r-2xl  flex relative pl-2 ">
        <Text className=" text-xl font-semibold">{product.title}</Text>
        <Text className="text-base">${product.price}</Text>
        <Text className=" text-xs text-[#626262] h-[40%] overflow-hidden">
          {product.description}
        </Text>
        <View className="absolute bottom-0 flex-row justify-end w-full mb-2 mr-2">
          <TouchableOpacity
            className="z-10 w-[40px] h-[40px] bg-white flex justify-center items-center rounded-full ml-2 "
            onPress={() => {
              setIsVisibleModal(true);
            }}
          >
            <Icons name="favorite" size={25} color={"#d22121"} />
          </TouchableOpacity>
          {!paid && (
            <TouchableOpacity
              className="z-10 w-[40px] h-[40px] bg-[#ffffff] flex justify-center items-center rounded-full ml-2"
              onPress={() => {
                setModalVisiblePurchase(true);
                setBookingProduct(product);
              }}
            >
              <Icons name="payment" size={25} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="z-10 w-[40px] h-[40px] bg-white flex justify-center items-center rounded-full ml-2"
            onPress={() => {
              setModalVisible(true);
              setBookingProduct(product);
            }}
          >
            <Icons name="pending-actions" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {isVisibleModal && <ModalConfirm />}
    </TouchableOpacity>
  );
};

export default CardFavo;
