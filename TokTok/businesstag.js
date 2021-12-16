import React, {useState, useEffect} from 'react';
import {Image, Dimensions, TouchableOpacity, Text, View, TextInput, StyleSheet} from "react-native";
import businessTag from './src/res/images/business_tag_sticker.png';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as WriteNfc from './writenfc.js';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
      justifyContent:'center',
      hieght:win.height,
      alignItems: 'center',
      backgroundColor:'white'
    },
    img:{
      resizeMode: 'cover',
      width: win.width,
      height: win.height,
    },
  });

function BusinessTag({navigation}){
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [businessnumber, setNumber] = useState("");

    useEffect(()=>{
        WriteNfc.initNfc();
        WriteNfc.writeNdef();
    },[]);
    return  (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
           <Image style={styles.img} source={businessTag}/>
      </KeyboardAwareScrollView>
    )
  }
  export default BusinessTag;