
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView
  } from "../tailwinds/tailwindComponent";
  import React, { useEffect, useState } from "react";
  import Icons from "@expo/vector-icons/MaterialIcons";
  import { useGetPostById } from "../hooks/usePost";
  import { useIsFocused } from "@react-navigation/native";
  import moment from 'moment';
  
  
  
  
  
  
  
  const CardPay = ({ payment, i, navigation }) => {
    const getPostById = useGetPostById()
    const [product, setproduct] = useState({})  
    const isFocus = useIsFocused()
  
  
  
    useEffect(()=>{
      getPostById.handleGetPostById(payment.postId)
    },[])
  
    useEffect(()=>{
      if(getPostById.error){
        console.log(getPostById.error)
        return
        
      }
      if(getPostById.response){
        setproduct(getPostById.response)
        
      }
    },[getPostById])
  
    
    return (
      <TouchableOpacity
        className={`flex-row h-[175px] w-[93%] mx-auto mb-4 relative   `}
        onPress={() => navigation.navigate("Details", { id: payment.postId })}
      >{
        product?.imageUrls&&
        <Image
          className="h-full w-[50%] object-cover rounded-l-2xl"
          source={{ uri: product?.imageUrls[0]  }}
        />
      }
      
  
       <View className="h-full w-[50%] bg-slate-200 rounded-r-2xl  flex relative pl-2 ">
          <Text className=" text-xl font-semibold">{product.title}</Text>
          
          <Text className=" text-lg mt-3 text-[#000000] h-[40%] overflow-hidden">Done at: {moment(payment.createdAt).format('yyyy-MM-DD HH:mm')}</Text>
          <View className="absolute bottom-0 flex-row justify-end w-full mb-2 mr-2">

          <Text className="text-xl font-semibold text-red-600">${product.price}</Text>
             
           
          </View>
       </View>
      </TouchableOpacity>
      
    );
  };
  
  
  
  export default CardPay;
  