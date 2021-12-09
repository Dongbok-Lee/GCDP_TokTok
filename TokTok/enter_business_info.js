import React, {useState, useEffect} from 'react';
import { Button, Text, View } from "react-native";

function Enter_Business_Info({navigation}){
    return (
      <View style={{flex: 1, alignItems: 'center', justyfyContent: 'center'}}>
        <Text>Details Screen</Text>
        <Button
          title="입력 완료"
          onPress={()=>navigation.push('Main')}
          />
      </View>
    )
  }

  export default Enter_Business_Info
  