import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index'
import { getTimeAgo } from '@/lib/utils';
import { router } from 'expo-router';
import { debounce } from 'lodash';


type chat = {
  messageId: string;
  time: string;
}

export default function NewChatScreen() {

  // Should be fetched from the server with most recent chats first
  const chatsData = [
    { messageId: "msg_001", time: "2025-05-24T10:15:00Z" },
    { messageId: "msg_011", time: "2025-05-24T11:45:30Z" },
    { messageId: "msg_003", time: "2025-05-24T08:10:00Z" },
    { messageId: "msg_004", time: "2025-05-23T22:25:15Z" },
    { messageId: "msg_012", time: "2025-05-24T10:55:45Z" },
    { messageId: "msg_006", time: "2025-05-22T10:30:45Z" },
    { messageId: "msg_007", time: "2025-05-21T17:30:45Z" },
    { messageId: "msg_008", time: "2025-05-18T10:30:45Z" },
    { messageId: "msg_013", time: "2025-05-24T11:59:45Z" },
    { messageId: "msg_010", time: "2025-05-24T09:30:45Z" },
  ];


  const [chats, setChats] = useState<chat[]>(chatsData)


  const handlePress = debounce(() => {
    router.push(`/(screens)/chatting`);
  }, 300); // 300ms debounce


  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15, maxWidth: 500, }}>
      <View style={styles.mainContainer}>


        <View style={styles.container}>

          <Text style={styles.cardTitle}>New Chat</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter User ID"
            placeholderTextColor="#9ca3af"
          />


          <TouchableOpacity >
            <View style={{ ...styles.buttons, backgroundColor: "#111827", width: "100%", alignItems: "center", borderColor: "#166534", borderRadius: 15, marginBottom: 10 }}>
              <Text style={{ color: "#9ca3af" }}>Connect</Text>
            </View>
          </TouchableOpacity>

        </View>

        <Text
          style={{ color: "#9ca3af", alignSelf: "flex-start", fontSize: 15, marginTop: 10, marginBottom: 10 }}
        >{`Recent Chats`}</Text>
        <ScrollView style={{ flex: 1, width: "100%", }} scrollEnabled={true} showsVerticalScrollIndicator={false}>

          {chats && chats.length > 0 ? (

            chats.map((chat, index) => (
              <TouchableOpacity key={index} onPress={handlePress}  >
                <View style={{ ...styles.container, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <Text style={{ ...styles.cardTitle, fontWeight: "semibold" }}>{chat.messageId}</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 12 }}>{getTimeAgo(chat.time)}</Text>
                </View></TouchableOpacity>)))
            :
            <Text style={{ color: "#9ca3af", alignSelf: "center", fontSize: 15, marginTop: 100, }}>No Recent Chats</Text>
          }
        </ScrollView>


      </View>
    </SafeAreaView>
  );
}
