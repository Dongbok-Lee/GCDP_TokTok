import React, {useState, useEffect} from 'react';
import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import RoleSelect from './roleselect'
import Enter_Business_Info from './enter_business_info';
import Enter_Personal_Info from './enter_personal_info';
import Main from './main';

const Stack = createNativeStackNavigator();

function App(){
  useEffect(()=>{
      setTimeout(()=> SplashScreen.hide(),500);
  },[]);
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="RoleSelect" component = {RoleSelect}/>
            <Stack.Screen name="Business" component = {Enter_Business_Info}/>
            <Stack.Screen name="Personal" component = {Enter_Personal_Info}/>
            <Stack.Screen name="Main" component = {Main}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;
