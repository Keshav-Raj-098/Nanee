import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
import { getTimeAgo } from '@/lib/utils';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type CallProps = {
    call: {
        id: string;
        name: string;
        mode: "audio" | "video";
        initiatedBy: "self" | "other";
        status: "missed" | "completed" | "ongoing";
        date: string; // ISO format date string
        time: string; // readable time like "2:15 PM"
    };
    handlePress: () => void;
}


export default function CallBox({ call, handlePress }: CallProps) {

    return (
        <TouchableHighlight
        // onPress={handlePress}
        >
            <View style={styles.container}>
                <View>
                    <Text style={[
                        styles.msgTitle,
                        call.status === "missed" && { color: "#ef4444" }
                    ]}>{call.name}</Text>

                    <View
                        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
                    >
                        <View style={{ paddingRight: 7 }}>

                            {call.initiatedBy === "self" ?

                                <MaterialIcons name="call-made" size={14} 
                                color={ "#45f248"} style={{fontWeight:"bold"}} />
                                :


                                <MaterialIcons name="call-received" size={14} color={
                                    call.status === "missed" ? "#ef4444" : "#45f248"
                                } />

                            }
                        </View>
                        <Text style={{ color: "#9ca3af", fontSize: 12 }}>{
                            getTimeAgo(call.date)}{`${call.date !== null && ", "}`}</Text>
                        <Text style={{ color: "#9ca3af", fontSize: 12 }}>{call.time}</Text>
                    </View>

                </View>


                <TouchableOpacity>{
                    call.mode === "audio" ?
                        <Ionicons name="call-outline" size={22} color="white" />
                        : <Feather name="video" size={22} color="white" />
                }
                </TouchableOpacity>
            </View>
        </TouchableHighlight>)
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: "#1f2937",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    msgTitle: {
        color: "#f3f4f6",
        fontSize: 17,
        fontWeight: "semibold",
    },
    lastMsg: {
        color: "#9ca3af",
        fontSize: 12,
        marginTop: 5,
    },
})