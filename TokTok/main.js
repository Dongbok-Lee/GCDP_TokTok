import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import axios from 'axios' ;
import moment from 'moment';
import BackgroundService from 'react-native-background-actions';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import * as ReadNfc from './readnfc';

const api_key = '8qB9v%2Ba1OSffsxIZm%2FGe5hCKAclrHZSULnzsQtsCuqLKf%2FGVcB9YEZ4EAiDrkuwQwoH%2F6dm3j9v70BxglJPlJA%3D%3D'
const nowTime = moment().format('YYYYMMDD')*1;
const Time = moment().format('YYYY-MM-DD')
const create_date = nowTime-3;
const end_date = nowTime;
var parseString = require('react-native-xml2js').parseString;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor:'white'
  },
  maintext:{
    fontSize: 35,
    color: '#1a73e8',
  },
  button:{
    justifyContent:'center',
    alignItems: 'center',
    width: 250,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196f3'
  },

  input:{
    borderWidth: 2,
    borderRadius: 5,
    justifyContent:'center',
    alignItems: 'center',
    width: 250,
    height: 40,
    borderRadius: 20,
  },
  card:{
    width: 200,
    height: 150,
    justifyContent:'space-around',
    alignItems: 'center',
    elevation: 2,
    backgroundColor:'#fff',
    borderRadius: 25,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
}
});

function Main({navigation}){
    const [entiredata, setEntiredata] = useState('')


    const get_confirmed_case_info = async()=>{
        let res;
        try{
          res = await axios.get(`http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${api_key}&pageNo=1&numOfRows=10&startCreateDt=${create_date}&endCreateDt=${end_date}`) ;
          parseString(res.data, function(err, result){
          setEntiredata((JSON.parse(JSON.stringify(res.data.response.body.items.item))),getData());
          console.log(JSON.parse(JSON.stringify(res.data)).response.body.items.item)
          })
        }catch(err){
          console.error('에러 ' + err.message);
        }
      }
      const getData = async() =>{
        const data = await AsyncStorage.getItem('usrinfo');
        console.log(JSON.parse(data).name);
        usrdata= JSON.parse(data);
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
        <View style = {styles.container}>
          <View>
           <Text style = {styles.maintext}>{Time}</Text>
           <Text
          style={{
            fontSize: 20,
            textAlign: 'right',
          }}
        > {entiredata[0].stateTime}</Text>
        </View>
        <View style={styles.card}>
          <Text style = {{fontSize : 20, color:'#1a73e8'}}>confirmed cases</Text>
          <Text>today: <Text style={{color:'red'}}>{entiredata[0].decideCnt - entiredata[1].decideCnt}</Text></Text>
          <Text>total: {entiredata[0].decideCnt}</Text>
        </View>
        <View style={styles.card}>
          <Text style = {{fontSize : 20, color:'#1a73e8'}}>dead</Text>
          <Text>today : <Text style={{color:'red'}}>{entiredata[0].deathCnt - entiredata[1].deathCnt}</Text></Text>
          <Text>total : {entiredata[0].deathCnt}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.push('RoleSelect')}>
          <Text style = {styles.text}>Logout</Text>
        </TouchableOpacity>
        </View>
    )
    }
   return(<Text>Loading...</Text>)
}

export default Main

