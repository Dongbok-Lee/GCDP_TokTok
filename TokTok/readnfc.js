import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import NfcManager, {NfcEvents,Ndef} from 'react-native-nfc-manager';
import axios from 'axios';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

export async  function initNfc() {
    await NfcManager.start();
  }
  
 export function readNdef() {

    let usrdata;
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise((resolve, props) => {
      let tagFound = null;

      const getData = async() =>{
        const data = await AsyncStorage.getItem('usrinfo');
        usrdata= JSON.parse(data);
        return usrdata;

      }
      NfcManager.setEventListener(NfcEvents.DiscoverTag, async(tag) => {
        const usrdata = await getData();
        console.log(usrdata);

        try{
          res = await axios.post(``,entireData) ;
          parseString(res.data, function(err, result){
          setEntiredata((JSON.parse(JSON.stringify(res.data.response.body.items.item))));
          console.log(JSON.parse(JSON.stringify(res.data)).response.body.items.item)
          })
        }catch(err){
          console.error('에러 ' + err.message);
        }

        const entireData = {
          'name': usrdata.name,
          'phone': usrdata.phonenumber,
          'address':usrdata.address,
          'marketname': '',
          'marketaddress': ''
        }
        tagFound = tag;
        resolve(tagFound);
        tagFound = JSON.parse(Ndef.text.decodePayload(tagFound.ndefMessage[0].payload));

        entireData.marketaddress = tagFound.address;
        entireData.marketname= tagFound.name;
        console.log(entireData);
        initNfc();
        readNdef();
        NfcManager.registerTagEvent().catch(() => 0);
      });
  
      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });
  
      NfcManager.registerTagEvent();
    });
  }