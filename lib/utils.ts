import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async ({key, value}:{key:string,value:string}) => {
  try {
    const jsonValue = JSON.stringify(value); // for object/array
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error saving to AsyncStorage", e);
  }
};


export const getData = async (key:string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading from AsyncStorage", e);
  }
};
