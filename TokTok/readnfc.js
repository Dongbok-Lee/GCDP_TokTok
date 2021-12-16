import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import NfcManager, {NfcEvents,Ndef} from 'react-native-nfc-manager';
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
        const entireData = {
          'name': 'Team 7',
          'phone': '010-0000-0000',
          'address':'대전광역시 대덕구 한남로 70 한남대학교',
          'market-name':'한남 파스타',
          'market-address':'대전광역시 대덕구 한남로 70 한남대학교'
        }
        console.log(entireData);
      }
      getData();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound);
        console.log(Ndef.text.decodePayload(tagFound.ndefMessage[0].payload));
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