import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, TouchableHighlight, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index'
import ChatBox from '@/components/chatBox';
import { router } from 'expo-router';
import { debounce } from 'lodash';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type chat = {
  messageId: string;
  lastMsg: string;
  time: string;
}


// Should be fetched from the server with most recent chats first
const chatsData: chat[] = [
  { messageId: "msg_001", lastMsg: "Hey, are you free today?", time: "2025-05-18T10:30:45Z" },
  { messageId: "msg_002", lastMsg: "Let's catch up in the evening.", time: "2025-05-21T17:30:45Z" },
  { messageId: "msg_003", lastMsg: "Project submission is tomorrow.", time: "2025-05-22T10:30:45Z" },
  { messageId: "msg_004", lastMsg: "Did you complete the assignment?", time: "2025-05-23T22:25:15Z" },
  { messageId: "msg_005", lastMsg: "I’ll send the notes soon.", time: "2025-05-24T08:10:00Z" },
  { messageId: "msg_006", lastMsg: "Meeting at 10 AM confirmed.", time: "2025-05-24T09:30:45Z" },
  { messageId: "msg_007", lastMsg: "Can you review the code?", time: "2025-05-24T10:15:00Z" },
  { messageId: "msg_008", lastMsg: "Looks good to me!", time: "2025-05-24T10:55:45Z" },
  { messageId: "msg_009", lastMsg: "Almost done, 5 mins more.", time: "2025-05-24T11:45:30Z" },
  { messageId: "msg_010", lastMsg: "Final version uploaded.", time: "2025-05-24T11:59:45Z" },
  { messageId: "msg_011", lastMsg: "Awesome work, team!", time: "2025-05-24T12:30:00Z" }]



export default function NewChatScreen() {

  const [chats, setChats] = useState<chat[]>(chatsData)
  const [startNewChat, setStartNewChat] = useState<boolean>(false)


  const handlePress = debounce(() => {
    router.push(`/(screens)/chatting`);
  }, 600); // 600ms debounce

  function ShowNewChatModal() {

    return (<Modal
      animationType="fade"
      transparent
      visible={startNewChat}
      onRequestClose={() => setStartNewChat(false)}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
        <View style={styles.container}>
          <View style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}>

            <Text style={styles.cardTitle}>Start New Call</Text>

            <TouchableOpacity onPress={() => setStartNewChat(false)}>
              <View
              >
                <MaterialIcons name="cancel" size={26} color="#ef4444" />
              </View>
            </TouchableOpacity>

          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter User ID"
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity>
            <View style={styles.buttons}>
              <Text style={{ color: "#9ca3af" }}>Connect</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal >
    )
  }

  return (
    // <SafeAreaView style={{ flex: 1, paddingHorizontal: 15, maxWidth: 500, }}>
    <View style={[styles.mainContainer, { position: "relative" }]}>

      {/* Modal */}
      <ShowNewChatModal />




      <TouchableHighlight
        underlayColor={"#0e7490"}
        onPress={() => {
          setStartNewChat(true);
        }}
        style={{
          padding: 15, backgroundColor: "#06b6d4", borderRadius: 15,
          position: "absolute", bottom: 30, right: 30, zIndex: 500, elevation: 5,
        }}>
        <MaterialCommunityIcons name="chat-plus" size={26} color="white" />
      </TouchableHighlight>


      <TouchableWithoutFeedback onPress={() => {
        router.push(`/(screens)/hiddenChats`)
      }}>

        <View style={{
          display: "flex", flexDirection: "row", alignItems: "center", gap: 10, padding: 15, backgroundColor: "#06b6d4", borderRadius: 15, marginBottom: 10, marginTop: 10, width: "100%"
        }}>
          <Ionicons name="archive-outline" size={28} color="white" />
          <Text
            style={{ color: "white", fontSize: 16, fontWeight: "600" }}
          >Hidden Chats</Text>
        </View>
      </TouchableWithoutFeedback>

      <FlatList
        data={chats}
        keyExtractor={(item, index) => item.messageId || index.toString()}
        renderItem={({ item }) => (
          <ChatBox chat={item} handlePress={handlePress} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, width: "100%", }}
        ListEmptyComponent={
          <Text style={{
            color: "#9ca3af",
            alignSelf: "center",
            fontSize: 15,
            marginTop: 100,
          }}>
            No Recent Chats
          </Text>
        }
      />

    </View >
    // </SafeAreaView>
  );
}
