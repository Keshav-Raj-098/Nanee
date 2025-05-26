import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import logo from "@/assets/images/Nanee_logo.png";
import { Colors } from '@/constants/Colors';
import { useState, useRef } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';


type MenuItemProps = {
  title: string;
  color?: string;
  routeTo?: '/(screens)/aboutUs';
  icon?: React.ReactNode;
}


function MenuItem({ title, color, icon, routeTo }: MenuItemProps) {
  const router = useRouter();

  return (
    <TouchableHighlight
      onPress={() => {
        if (routeTo) {
          router.push(routeTo);
        } else {
          Toast.show({
            type: 'info',
            text1: 'Route Not Defined',
            swipeable: true,
            position: 'top',
            visibilityTime: 900,
          });
        }
      }}
      underlayColor="#1f2631"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        backgroundColor: color || Colors.dark.background,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <Text style={{ color: 'white', fontSize: 15 }}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}



export default function TabLayout() {
  const colorScheme = useColorScheme();
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
            backgroundColor: colorScheme === 'dark' ? '0000' : '#ffffff',
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
        <Image
          source={logo}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',

          }}
        />

        {/* Title */}
        <Text style={[styles.headerTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
          Nanee
        </Text>

        {/* Right: Button */}
        <TouchableOpacity
          onPress={() => { setIsOpen(!isOpen) }}
        >
          <Entypo name="dots-three-vertical" size={25} color={colorScheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>


        {/* Menu Items */}
        {
          isOpen && (
            <TouchableNativeFeedback
              style={{ position: 'absolute', top: 0, right: 0, backgroundColor: "red", width: "100%", height: "100%" }}
              onPress={() => { setIsOpen(false) }}
            >
              <View style={styles.threeDotMenu}>

                <MenuItem title='About Us' routeTo='/(screens)/aboutUs' icon={
                  <MaterialIcons name="info-outline" size={24} color={Colors.dark.iconColor} />} />

                <MenuItem title='Profile' routeTo='/(screens)/aboutUs' icon={
                  <MaterialIcons name="face" size={24} color={Colors.dark.iconColor} />} />

                <MenuItem title='Logout' routeTo='/(screens)/aboutUs' icon={
                  <MaterialIcons name="logout" size={24} color={Colors.dark.iconColor} />} />



              </View>
            </TouchableNativeFeedback>

          )
        }
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
            tabBarIcon: ({ color }: { color: string }) => <Feather name="home" size={28} color={color} />,
          }}
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
  threeDotMenu: {
    position: 'absolute',
    top: 70,
    right: 35,
    width: 150,
    borderRadius: 8,
    backgroundColor: Colors.dark.background,
    shadowColor: '#000',
    zIndex: 1000,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
