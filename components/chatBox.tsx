import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
import { getTimeAgo } from '@/lib/utils';


type ChatProps = {
    chat: {
        messageId: string;
        lastMsg: string;
        time: string;
    };
    handlePress: () => void;
}


export default function ChatBox({ chat, handlePress }: ChatProps) {

    return (
        <TouchableHighlight onPress={handlePress}  >
            <View style={{ ...styles.container, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <View>
                    <Text style={styles.msgTitle}>{chat.messageId}</Text>

                    <Text style={styles.lastMsg}>{chat.lastMsg}</Text>

                </View>
                <View style={{height:"100%", display:"flex", flexDirection:"column",justifyContent:"flex-start", alignItems:"flex-start",paddingHorizontal:5 }}>
                    <Text style={{ color: "#9ca3af", fontSize:12 }}>{getTimeAgo(chat.time)}</Text>
                </View>
            </View>
        </TouchableHighlight>)
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#1f2937",
        width: "100%",
    },
    msgTitle: {
        color: "#f3f4f6",
        fontSize: 17,
        fontWeight: "bold",
    },
    lastMsg: {
        color: "#9ca3af",
        fontSize: 12,
        marginTop: 5,
    },
})