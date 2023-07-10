import { View, Text } from 'react-native'
import React from 'react'
import {
    SafeAreaView,
  } from "react-native-safe-area-context";
import { allProduct } from '../mockData/products';
import CardFavo from '../components/CardFavo';
import { ScrollView } from '../tailwinds/tailwindComponent';

const FavoriteScreen = ({navigation}) => {
  return (
    <SafeAreaView>
        <ScrollView className='mt-5'>
        {allProduct.map((item,index)=>{
            return(
                <View key={item.id}>
                    <CardFavo product={item} i={index} navigation={navigation}></CardFavo>
                </View>
            )
        }) }
        </ScrollView>
    </SafeAreaView>
  )
}

export default FavoriteScreen