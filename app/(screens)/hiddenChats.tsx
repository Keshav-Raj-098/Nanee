import { Image } from 'expo-image';
import { View, Text, FlatList, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import { styles } from '../(tabs)/index'
import ChatBox from '@/components/chatBox';
import { router } from 'expo-router';
import { debounce } from 'lodash';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';


type chat = {
    messageId: string;
    lastMsg: string;
    time: string;
}

// Should be fetched from the server with most recent chats first
const chatsData: chat[] = [
    { messageId: "msg_101", lastMsg: "Let's catch up soon!", time: "2025-06-01T14:20:00Z" },
    { messageId: "msg_102", lastMsg: "Don't forget the meeting tomorrow.", time: "2025-06-02T09:00:00Z" },
    { messageId: "msg_103", lastMsg: "Happy Birthday!", time: "2025-06-03T08:30:00Z" },
    { messageId: "msg_104", lastMsg: "I'll send the files by evening.", time: "2025-06-03T17:45:00Z" },
    { messageId: "msg_105", lastMsg: "Thanks for your help!", time: "2025-06-04T11:15:00Z" },
    { messageId: "msg_106", lastMsg: "See you at the event.", time: "2025-06-05T13:00:00Z" },
    { messageId: "msg_107", lastMsg: "Can you review this document?", time: "2025-06-06T10:25:00Z" },
    { messageId: "msg_108", lastMsg: "Lunch at 1 PM?", time: "2025-06-07T12:00:00Z" },
    { messageId: "msg_109", lastMsg: "Congrats on your promotion!", time: "2025-06-08T16:40:00Z" },
    { messageId: "msg_110", lastMsg: "Let's plan a trip.", time: "2025-06-09T18:15:00Z" },
]




export default function HiddenChatsScreen() {


    const [chats, setChats] = useState<chat[]>(chatsData)
    const insets = useSafeAreaInsets();


    const handlePress = debounce(() => {
        router.push(`/(screens)/chatting`);
    }, 1000); // 600ms debounce

    return (

        <View style={[styles.mainContainer, { flex: 1, paddingHorizontal: 0 }]}>

            <View style={
                {
                    width: "100%",
                    paddingTop: insets.top,
                    height: 60 + insets.top,
                    backgroundColor: "#232c37",
                    position: 'relative',


                }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    // backgroundColor: "#1f2937",
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 20,fontWeight:"bold",marginLeft: 5 }}>
                        Hidden Chats
                    </Text>
                </View>
            </View>

            {/* <View style={{margin:10}}> */}
            <FlatList
                data={chats}
                keyExtractor={(item, index) => item.messageId || index.toString()}
                renderItem={({ item }) => (
                    <ChatBox chat={item} handlePress={handlePress} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, width: "93%", marginVertical: 10 }}
                ListEmptyComponent={
                    <Text style={{
                        color: "#9ca3af",
                        alignSelf: "center",
                        fontSize: 15,
                        marginTop: 100,
                    }}>
                        No Chats Hidden
                    </Text>
                }
            />
            {/* </View> */}
        </View >

        // </SafeAreaView>

    )

}