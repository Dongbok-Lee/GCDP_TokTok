import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

// Pre-step, call this before any NFC operations
export async function initNfc() {
  await NfcManager.start();
}

export async function writeNdef() {
  let result = false;
  let entireData;
  const getData = async() =>{
    const data = await AsyncStorage.getItem('bisinfo');
    console.log(JSON.parse(data).name);
    bisdata= JSON.parse(data);
    entireData = {
      'name':bisdata.name,
      'address':bisdata.address
    }
  }

  getData();

  try {
    // Step 1
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: 'Ready to write some NDEF',
    });

    const bytes = Ndef.encodeMessage([Ndef.textRecord(JSON.stringify(entireData))]);
    console.log(Ndef.textRecord(JSON.stringify(entireData)));

    if (bytes) {
      await NfcManager.ndefHandler // Step2
        .writeNdefMessage(bytes); // Step3
        console.log(entireData);
        console.log("write");
    }
    result = true;
  } catch (ex) {
    console.warn(ex);
  }

  // Step 4
  NfcManager.cancelTechnologyRequest().catch(() => 0);
  return result;
}