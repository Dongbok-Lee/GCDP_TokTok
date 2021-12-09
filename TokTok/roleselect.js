import React, {useState, useEffect} from 'react';
import { Button, Text, View } from "react-native";


function RoleSelect( {navigation} ){
  return (
    <View>
      <Text>App Tok Tok Home</Text>
      <Text>사용자 정보 입력</Text>
      <Button
        title = "사업자"
        onPress = {()=> navigation.push('Business')}
        />
        <Button
        title = "개인"
        onPress = {()=> navigation.push('Personal')}
        />
    </View>
  )
}

export default RoleSelect;