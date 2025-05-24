import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

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


// This function should be in backend
export function getTimeAgo(inputTime: string | Date): string {
  const now: Date = new Date();
  const time: Date = new Date(inputTime);
  const diffMs: number = now.getTime() - time.getTime();
  const diffSec: number = Math.floor(diffMs / 1000);
  const diffMin: number = Math.floor(diffSec / 60);
  const diffHr: number = Math.floor(diffMin / 60);
  const diffDay: number = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay === 1) return "yesterday";
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
}



export const copyToClipboard = async (text:string) => {
  await Clipboard.setStringAsync(text);
  // console.log('Copied to clipboard:', text);
};

