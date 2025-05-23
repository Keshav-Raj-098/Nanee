import { Image } from 'expo-image';
import { Platform, ScrollView,StyleSheet, View,Text } from 'react-native';
import { useState,useEffect } from 'react';

export default function TabTwoScreen() {
  return (
      <View style={styles.mainContainer}>
          <ScrollView >
            <Text 
            style={{color:"#9ca3af"}}
            >{`No Chats`}</Text>
    
    
    
          </ScrollView>
    
    
        </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', padding: 0 }
});
