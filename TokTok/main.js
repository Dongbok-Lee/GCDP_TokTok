import React, {useState, useEffect} from 'react';
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import axios from 'axios' ;
import moment from 'moment';
import mainImg from './src/res/images/main.png';
import BackgroundService from 'react-native-background-actions';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ReadNfc from './readnfc';
const api_key = '8qB9v%2Ba1OSffsxIZm%2FGe5hCKAclrHZSULnzsQtsCuqLKf%2FGVcB9YEZ4EAiDrkuwQwoH%2F6dm3j9v70BxglJPlJA%3D%3D'
const nowTime = moment().format('YYYYMMDD')*1;
const Time = moment().format('YYYY-MM-DD')
const create_date = nowTime-3;
const end_date = nowTime;
var parseString = require('react-native-xml2js').parseString;
const win = Dimensions.get('window');


function Main({navigation}){
    const [entiredata, setEntiredata] = useState('')

    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent:'center',
        hieght:win.height,
        alignItems: 'center',
        backgroundColor:'white'
      },
      imgs:{
        resizeMode: 'cover',
        width: win.width,
        height: win.height,
      },
    });


    const get_confirmed_case_info = async()=>{
        let res;
        try{
          res = await axios.get(`http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${api_key}&pageNo=1&numOfRows=10&startCreateDt=${create_date}&endCreateDt=${end_date}`) ;
          parseString(res.data, function(err, result){
          setEntiredata((JSON.parse(JSON.stringify(res.data.response.body.items.item))));
          console.log(JSON.parse(JSON.stringify(res.data)).response.body.items.item)
          })
        }catch(err){
          console.error('에러 ' + err.message);
        }
      }

      const startNfc = async( ) =>{
        await ReadNfc.initNfc();
        ReadNfc.readNdef();
      }
      useEffect(() => {
        get_confirmed_case_info();
        BackgroundService.start(ReadNfc.readNdef(),);
        startNfc();
      }, []);

    if(entiredata != ''){
      return(
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Image style={styles.imgs} source={mainImg}/>
      </KeyboardAwareScrollView>
    )
    }
   return(<Text>Loading...</Text>)
}

export default Main

