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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello!', sender: 'other' },
        { id: '2', text: 'Hi, how are you?', sender: 'me' },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim() === '') return;
        setMessages([{ id: Date.now().toString(), text: input, sender: 'me' }, ...messages]);
        setInput('');
    };

    const renderItem = ({ item }: { item: Message }) => (
        <View
            style={[
                styles.messageContainer,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.avoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
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
            </SafeAreaView >
        </KeyboardAvoidingView>
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
        padding: 12,
    },
    messageContainer: {
        maxWidth: '75%',
        marginVertical: 4,
        padding: 10,
        borderRadius: 16,
        backgroundColor:"red"
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
});
