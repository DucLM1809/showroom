import {} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "../tailwinds/tailwindComponent";
import { Iproduct } from "../mockData/products";
import Icons from "@expo/vector-icons/MaterialIcons";
import DatePicker from "react-native-modern-datepicker";
import { ToastAndroid } from "react-native";
import { useGetBooking, usePostBooking } from "../hooks/useBooking";

export interface props {
  modalVisible: boolean;
  setModalVisible: any;
  product: Iproduct;
}
const ModalBooking = ({ modalVisible, setModalVisible, product }: props) => {
  const [dateStr, setDateStr] = useState("");
  const [dateParse, setDateParse] = useState() as any;
  const [note, setnote] = useState('')

  const getBooking = useGetBooking()
  const postBooking = usePostBooking()

  useEffect(()=>{
    if(postBooking.error){
    
      console.log(postBooking.response);
      
    }
    else if( postBooking.response){
      
    }
  },[postBooking])

  return (
    <Modal
      className=""
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="bg-[#0000008f] w-full h-full absolute bottom-0">
        <View className=" bg-white w-full h-[80%] absolute bottom-0 rounded-t-xl flex items-center">
          <View className=" absolute w-full bottom-6 z-10 flex-row justify-center ">
            <TouchableOpacity
              className="  bg-[#bab9b9] py-2 px-5 rounded-2xl mr-6"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text className=" text-lg font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="  bg-[#1779d4] py-2 px-5 rounded-2xl ml-6"
              onPress={() => {
                try {
                  const [dateValues, timeValues] = dateStr.split(" ");

                  let [year, month, day] = dateValues.split("/");
                  let [hours, minutes] = timeValues.split(":");

                  let date = new Date(
                    +year,
                    +month - 1,
                    +day,
                    +hours,
                    +minutes
                  );
                  setDateParse(date)
                } catch (error) {
                  ToastAndroid.show("Please pick a date", ToastAndroid.LONG);
                  return;
                }
                postBooking.handlePostBooing(product.id,{
                  expectedVisitAt: dateParse,
                  note: note
                })
                setModalVisible(false);
              }}
            >
              <Text className=" text-lg font-semibold text-white">Booking</Text>
            </TouchableOpacity>
          </View>

          <Text className=" text-2xl font-bold mt-3">Booking</Text>
          <DatePicker onSelectedChange={(date) => setDateStr(date)} />
          <TextInput className="border w-[90%] px-3 absolute bottom-20 bg-white rounded-lg" multiline  maxLength={60}
        numberOfLines={3} value={note} onChangeText={setnote} placeholder="Note"></TextInput>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBooking;
