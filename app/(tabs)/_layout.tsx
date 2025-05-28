import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import logo from "@/assets/images/Nanee_logo.png";
import { Colors } from '@/constants/Colors';
import { useState, useRef } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';


export default function TabLayout() {
  const router = useRouter();
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>

      {/* OverLay */}
      {
        isOpen && (

          <TouchableWithoutFeedback

            onPress={() => setIsOpen(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent',
                zIndex: 800,
              }}
            />
          </TouchableWithoutFeedback>
        )
      }
      {/* Custom Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: '0000',
            paddingTop: 30,
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          },
        ]}
      >
        {/* Left: Logo */}
        {/* <Image
          source={logo}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',

          }}
        /> */}

        {/* Title */}
        <Text style={[styles.headerTitle, { color: '#fff', fontSize: 33, fontWeight: "bold" }]}>
          nanee
        </Text>

        <TouchableWithoutFeedback
          onPress={() => { router.push('/(screens)/aboutUs') }}
        >

          <Octicons name="info" size={24} color="#8e8e93" style={{ paddingEnd: 15 }} />

        </TouchableWithoutFeedback>





      </View>


      {/* Tabs Navigator */}
      <Tabs
        screenOptions={{
          headerShown: false, // disable native headers inside tabs
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarActiveTintColor: Colors.dark.primary,   // color when tab is active
          tabBarInactiveTintColor: '#8e8e93', // color when tab is inactive
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {
              backgroundColor: '#0000',
              borderTopWidth: 2,
              height: 70,
              paddingTop: 10,
              // display: 'flex',
              // flexDirection: 'row',
              // alignItems: 'center',

            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }: { color: string }) => (
            
              <Image
                source={logo}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
   ) }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color }: { color: string }) => (
              <Ionicons name="chatbox-ellipses-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            title: 'Calls',

            tabBarIcon: ({ color }: { color: string }) => (

              < Ionicons name="call-outline" size={ 28} color={ color } />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70, // adjust as needed
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    // backgroundColor:"red",
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },

});
