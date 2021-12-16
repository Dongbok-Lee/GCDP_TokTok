import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import SignupImage from './src/res/images/signupimg.jpg';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor:'white'
  },
  topimg:{
    resizeMode: 'contain',
    flex: 5,
  },
  buttonview:{
    flex:1
  },
  button:{
    justifyContent:'center',
    alignItems: 'center',
    width: 250,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196f3'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
}
});

function RoleSelect( {navigation} ){
  return (
    <View style={styles.container}>
      <Image style={styles.topimg} source={SignupImage}/>
      <View style={{flex:1}}></View>
      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.button} onPress = {()=> navigation.push('Business')}>
          <Text style={styles.text}>For Business</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.button} onPress = {()=> navigation.push('Personal')}>
          <Text style={styles.text}>For Personal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RoleSelect;