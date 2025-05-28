import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, TouchableHighlight, Modal, Pressable, } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index'
import CallBox from '@/components/callBox';
import { router } from 'expo-router';
import { debounce } from 'lodash';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';



type call = {
    id: string;
    name: string;
    mode: "audio" | "video";
    initiatedBy: "self" | "other";
    status: "missed" | "completed" | "ongoing"; // optional status field
    date: string; // ISO format date string
    time: string; // readable time like "2:15 PM"
};



// Should be fetched from the server with most recent chats first
const callsData: call[] = [
    {
        id: "1",
        name: "User1",
        mode: "audio",
        initiatedBy: "self",
        status: "completed",
        date: "2025-05-26T14:15:00Z",
        time: "2:15 PM",
    },
    {
        id: "2",
        name: "User2",
        mode: "video",
        initiatedBy: "other",
        status: "missed",
        date: "2025-05-25T10:45:00Z",
        time: "10:45 AM",
    },
    {
        id: "3",
        name: "User3",
        mode: "audio",
        initiatedBy: "self",
        status: "ongoing",
        date: "2025-05-24T08:20:00Z",
        time: "8:20 AM",
    },
    {
        id: "4",
        name: "User4",
        mode: "video",
        initiatedBy: "other",
        status: "completed",
        date: "2025-05-23T18:10:00Z",
        time: "6:10 PM",
    },
    {
        id: "5",
        name: "User5",
        mode: "audio",
        initiatedBy: "self",
        status: "missed",
        date: "2025-05-22T21:05:00Z",
        time: "9:05 PM",
    },
];




export default function CallScreen() {

    const [calls, setCalls] = useState<call[]>(callsData)
    const [startNewCall, setStartNewCall] = useState<boolean>(false)


    const handlePress = debounce(() => {
        router.push(`/(screens)/callDetails`);
    }, 600); // 600ms debounce

    function ShowNewCallModal() {

        return (<Modal
            animationType="fade"
            transparent
            visible={startNewCall}
            onRequestClose={() => setStartNewCall(false)}
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
                        flexDirection: "row",}}>

                        <Text style={styles.cardTitle}>Start New Call</Text>

                        <TouchableOpacity onPress={() => setStartNewCall(false)}>
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


                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                        gap: 20,
                    }}>

                        <TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor: "#06b6d4",
                                    padding: 10,
                                    borderRadius: 50,
                                }}
                            >
                                <Ionicons name="call-outline" size={26} color="white" />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor: "#06b6d4",
                                    padding: 10,
                                    borderRadius: 50,
                                }}
                            >
                                <Feather name="video" size={26} color="white" />
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>
            </View>
        </Modal >
        )
    }

    return (
        // <SafeAreaView style={{ flex: 1, paddingHorizontal: 15, maxWidth: 500, }}>
        <View style={[styles.mainContainer, { position: "relative" }]}>

            {/* Modal */}
            <ShowNewCallModal />




            <TouchableHighlight
                underlayColor={"#0e7490"}
                onPress={() => {
                    setStartNewCall(true);
                }}
                style={{
                    padding: 15, backgroundColor: "#06b6d4", borderRadius: 15,
                    position: "absolute", bottom: 30, right: 30, zIndex: 500, elevation: 5,
                }}>
                <MaterialIcons name="add-ic-call" size={26} color="white" />
            </TouchableHighlight>



            <FlatList
                data={calls}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={({ item }) => (
                    <CallBox call={item} handlePress={handlePress} />
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
                        No Calls Yet,Start a new call by pressing the button below.
                    </Text>
                }
            />

        </View >
        // </SafeAreaView>
    );
}
