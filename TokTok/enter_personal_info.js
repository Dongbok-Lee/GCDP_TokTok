import React, {useState, useEffect} from 'react';
import { Button, Text, View } from "react-native";

function Enter_Personal_Info({navigation}){
    return (
      <View style={{flex: 1, alignItems: 'center', justyfyContent: 'center'}}>
        <Text>Details Screen</Text>
        <Button
          title="입력완료"
          onPress={()=>navigation.push('Main')}
          />
      </View>
    )
  }

  export default Enter_Personal_Info
  