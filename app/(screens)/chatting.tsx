import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Pressable,
    TouchableHighlight
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon_WithRippleEffect from '@/components/IconRipple';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';



const colors = {
    background: "#000000",
    cardBackground: "#1f2937",
    inputBackground: "#374151",
    inputBorder: "#454f5e",
    primaryText: "#ffffff",
    secondaryText: "#9ca3af",
    accentGreen: "#166534",
    buttonBackground: "#111827",
    buttonText: "#9ca3af",
};

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
}

export default function ChattingScreen() {

    const router = useRouter();
    const insets = useSafeAreaInsets();


  //remember to fetch message such that the latest comes first
    const [messages, setMessages] = useState<Message[]>([
        { id: '16', text: "Haha sure. See you then!", sender: 'me' },
        { id: '15', text: "Not really. Just come on time 😄", sender: 'other' },
        { id: '14', text: "Got it. Anything else?", sender: 'me' },
        { id: '13', text: "Oh, and bring your laptop. We might need it.", sender: 'other' },
        { id: '12', text: "Cool! Looking forward to it.", sender: 'me' },
        { id: '11', text: "Perfect. I'll be there.", sender: 'other' },
        { id: '10', text: "Yep, 6 PM at the usual place?", sender: 'me' },
        { id: '9', text: "By the way, are we still on for Saturday?", sender: 'other' },
        { id: '8', text: "Thanks, I appreciate it.", sender: 'me' },
        { id: '7', text: "Nice! Let me know if you need help.", sender: 'other' },
        { id: '6', text: "Almost. Just doing the final edits now.", sender: 'me' },
        { id: '5', text: "Have you finished that report?", sender: 'other' },
        { id: '4', text: "Yeah, I get that. Same here.", sender: 'me' },
        { id: '3', text: "I'm good, just a bit busy with work.", sender: 'other' },
        { id: '2', text: "Hi, how are you?", sender: 'me' },
        { id: '1', text: "Hello!", sender: 'other' }
    ]
    );



    const [input, setInput] = useState('');

    const [messageSelected, setMessageSelected] = useState<boolean>(false);
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);


    const sendMessage = () => {
        if (input.trim() === '') return;
        setMessages([ { id: Date.now().toString(), text: input, sender: 'me' },...messages]);
        setInput('');
    };


    const renderItem = ({ item }: { item: Message }) => {
        const isSelected = selectedMessages?.includes(item.id);

        const handleLongPress = () => {
            if (!messageSelected || selectedMessages?.length === 0) {
                setMessageSelected(true);
                setSelectedMessages([item.id]);
            } else {
                if (!isSelected) {
                    selectedMessages !== null ?
                        setSelectedMessages([...selectedMessages, item.id]) :
                        setSelectedMessages([item.id]);
                }
            }
        };

        const handlePress = () => {
            if (messageSelected) {
                if (isSelected) {
                    // Deselect
                    const updated = selectedMessages.filter(id => id !== item.id);
                    setSelectedMessages(updated);
                    if (updated.length === 0) {
                        setMessageSelected(false);
                    }
                } else {
                    // Select
                    setSelectedMessages([...selectedMessages, item.id]);
                }
            } else {
                return;
            }
        };

        return (
            <Pressable
                onLongPress={handleLongPress}
                onPress={handlePress}
                style={({ pressed }) => [
                    {
                        width: '100%',
                        alignItems: item.sender === 'me' ? 'flex-end' : 'flex-start',
                        backgroundColor: isSelected ? '#334155' : 'transparent',
                        paddingHorizontal: 10,
                    },
                ]}
            >
                <View
                    style={[
                        styles.messageContainer,
                        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
                    ]}
                >
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </Pressable>
        );
    };

    function HeaderBeforeMsgSelected() {

        return (
            <View style={[
                styles.header,
                {
                    paddingTop: insets.top,
                    height: 60 + insets.top,
                    backgroundColor: `${messageSelected ? "#232c37" : colors.cardBackground}`
                },
            ]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableWithoutFeedback>
                        <Text style={{ color: colors.primaryText, fontSize: 18, marginLeft: 10 }}>
                            User01
                        </Text>
                    </TouchableWithoutFeedback>
                </View >

                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Ionicons name="call-outline" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Feather name="video" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }


    const handleMessageDelete = () => {
        const updatedMessages = messages.filter((e) => !selectedMessages.includes(e.id));
        setMessages(updatedMessages);
        setSelectedMessages([]);
        setMessageSelected(false);
    };


    // after msg selected 
    function HeaderAfterMsgSelected() {

        return (
            <View style={[
                styles.header,
                {
                    paddingTop: insets.top,
                    height: 60 + insets.top,
                    backgroundColor: `${messageSelected ? "#232c37" : colors.cardBackground}`
                },
            ]}>
                <View style={styles.headerLeft}>

                    <Icon_WithRippleEffect
                        icon={<Feather name="arrow-left" size={24} color="white" />}
                        onPress={() => {
                            setMessageSelected(false);
                            setSelectedMessages([]);
                        }}
                    />


                    <Text style={{ color: colors.primaryText, fontSize: 18, marginLeft: 10 }}>
                        {selectedMessages && `${selectedMessages.length}`}
                    </Text>
                </View >

                <View style={styles.headerRight}>
                    <Icon_WithRippleEffect
                        icon={<MaterialCommunityIcons name="arrow-left-top" size={24} color="white" />}
                        onPress={() => console.log("Arrow back pressed")}
                    />
                    <Icon_WithRippleEffect
                        icon={<MaterialIcons name="delete-outline" size={24} color="white" />}
                        onPress={handleMessageDelete}
                    />
                    <Icon_WithRippleEffect
                        icon={<Ionicons name="arrow-redo-outline" size={24} color="white" />}
                        onPress={() => console.log("Redo pressed")}
                    />
                </View>

            </View>
        )
    }



    return (
        <KeyboardAvoidingView
            style={styles.avoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.container}>
                {messageSelected ? HeaderAfterMsgSelected() : HeaderBeforeMsgSelected()}


                {
                    messages.length === 0 ? (
                        <View style={styles.messagesList}>
                            <Text style={{ color: colors.secondaryText, textAlign: 'center' }}>
                                No messages yet. Start the conversation!
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            inverted
                            contentContainerStyle={styles.messagesList}
                            keyboardShouldPersistTaps="handled"
                        />
                    )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.secondaryText}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView >

    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    avoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    messagesList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingVertical: 12,
        gap: 3,
    },
    messageContainer: {
        maxWidth: '75%',
        marginVertical: 4,
        padding: 10,
        borderRadius: 16,
    },
    myMessage: {
        backgroundColor: colors.accentGreen,
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: colors.cardBackground,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: colors.primaryText,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        borderTopWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: colors.buttonBackground,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: colors.inputBackground,
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        marginRight: 8,
        height: 40,
        color: colors.primaryText,
    },
    sendButton: {
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.accentGreen,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    sendButtonText: {
        color: colors.buttonText,
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 22,
        alignItems: 'center',
    },
});
