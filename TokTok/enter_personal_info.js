import React, {useState, useEffect} from 'react';
import {Dimensions, TouchableOpacity, Text, View, TextInput, Image, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PersonalImage from './src/res/images/personalimg.jpg';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    hieght:win.height,
    alignItems: 'center',
    backgroundColor:'white'
  },
  topimg:{
    margin: 0,
    padding:0,
    resizeMode: 'stretch',
    width: win.width,
    height: win.height*3/10
  },
  buttonview:{
    height: win.height*2/10,
    justifyContent:'center',
  },
  button:{
    justifyContent:'center',
    alignItems: 'center',
    width: 250,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196f3'
  },
  inputview:{
    height: win.height*5/10,
    justifyContent:'space-evenly',
    alignItems: 'center',
  },
  input:{
    borderWidth: 2,
    borderRadius: 5,
    justifyContent:'center',
    alignItems: 'center',
    width: 250,
    height: 50,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
}
});

function Enter_Personal_Info({navigation}){
      const [name, setName] = useState("");
      const [address, setAddress] = useState("");
      const [phonenumber, setPhoneNumber] = useState("");

      const Save_Info = () => {
        AsyncStorage.setItem('usrinfo',JSON.stringify({'name':name, 'address':address, 'phonenumber':phonenumber}), () => { 
        console.log('유저 정보 저장 완료')
        navigation.push('Main')
        });
      }

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Image style={styles.topimg} source={PersonalImage}/>
        <View style ={styles.inputview}>
          <View>
          <Text>Name</Text>
          <TextInput
            style = {styles.input}
            underlineColorAndroid="transparent"
            placeholder="  Enter name"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={text => setName(text)}
          />
          </View>
          <View>
          <Text>Address</Text>
          <TextInput
            style = {styles.input}
            underlineColorAndroid="transparent"
            placeholder="  Enter Address"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={text => setAddress(text)}
          />
          </View>
          <View>
          <Text>PhoneNumber</Text>
          <TextInput
            style = {styles.input}
            underlineColorAndroid="transparent"
            placeholder="  Enter Phone Number"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={text => setPhoneNumber(text)}
          />
        </View>
        </View>
        <View style = {styles.buttonview}>
          <TouchableOpacity style={styles.button} onPress={()=>Save_Info()}>
            <Text style={styles.text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  export default Enter_Personal_Info