import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Pressable, TouchableHighlight, TouchableNativeFeedback, Modal
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon_WithRippleEffect from '@/components/IconRipple';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Overlay from '@/components/Overlay';





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


type MenuItemProps = {
    title: string;
    color?: string;
    onPress?: () => void;
}


function MenuItem({ title, color, onPress }: MenuItemProps) {
    const router = useRouter();

    return (
        <TouchableHighlight
            onPress={onPress}
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
            {/* can add color prop if required */}
            <Text style={{ color: `${title !== "Delete" ? "white" : "red"}`, fontWeight: 400, fontSize: 15, }}> {title}</Text>

        </TouchableHighlight>
    );
}



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
    const [isThreeDotOpen, setIsThreeDotOpen] = useState<boolean>(false);
    const [isDeletedClicked, setIsDeletedClicked] = useState<boolean>(false);
    const [isEditNameClicked, setIsEditNameClicked] = useState<boolean>(false);

    const [currentDisplayName, setCurrentDisplayName] = useState<string>("Keshav");
    const [newDisplayName, setNewDisplayName] = useState<string>("");
    const [showNulldisplayNameerror, setShowNulldisplayNameerror] = useState<boolean>(false);

    const [messageSelected, setMessageSelected] = useState<boolean>(false);
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);


    const sendMessage = () => {
        if (input.trim() === '') return;
        setMessages([{ id: Date.now().toString(), text: input, sender: 'me' }, ...messages]);
        setInput('');
    };


    // Handle Hide Chat function
    const handleChatHide = () => {
        console.log("Chat hidden");
        router.back();
        setTimeout(() => {
            Toast.show({
                type: 'success',
                text1: 'ChatXYZ Hidded',
            })
        }, 200)

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
                    <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>{item.text}</Text>
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
                    backgroundColor: `${messageSelected ? "#232c37" : colors.cardBackground}`,
                    position: 'relative',
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

                    <TouchableOpacity
                        onPress={() => setIsThreeDotOpen(!isThreeDotOpen)}
                    >
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Menu Items */}
                    {
                        isThreeDotOpen && (
                            <TouchableNativeFeedback
                                style={{ position: 'absolute', top: 0, right: 0, backgroundColor: "red", width: "100%", height: "100%" }}
                                onPress={() => { setIsThreeDotOpen(false) }}
                            >
                                <View style={styles.threeDotMenu}>

                                    <MenuItem title='Edit Name' onPress={() => { setIsEditNameClicked(true); setIsThreeDotOpen(false) }} />

                                    <MenuItem onPress={handleChatHide} title='Hide' />

                                    <MenuItem
                                        onPress={() => {
                                            setIsDeletedClicked(true);
                                            setIsThreeDotOpen(false);
                                        }}
                                        title='Delete' />
                                </View>
                            </TouchableNativeFeedback>

                        )
                    }
                </View>

            </View>
        )
    }

    // after msg selected 
    function HeaderAfterMsgSelected() {

        const handleMessageDelete = () => {
            const updatedMessages = messages.filter((e) => !selectedMessages.includes(e.id));
            setMessages(updatedMessages);
            setSelectedMessages([]);
            setMessageSelected(false);
        };


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

    function EditDisplayName() {


        const handleChangeDisplayName = () => {

            if (newDisplayName.trim() === "") {
                setShowNulldisplayNameerror(true);
                return;
            }

            setCurrentDisplayName(newDisplayName);
            setNewDisplayName("");
            setIsEditNameClicked(false);
            setShowNulldisplayNameerror(false);
            Toast.show({
                type: 'success',
                text1: 'Display Name Changed',

            });
        }

        return (<Modal
            animationType="fade"
            transparent
            visible={isEditNameClicked}
            onRequestClose={() => setIsEditNameClicked(false)}
        ><View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 22,
        }}>
                <View style={styles.container_Modal}>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "semibold",
                    }}>{`Your Current display same is:`}</Text>

                    <Text style={{
                        color: "#06b6d4",
                        fontSize: 16,
                        marginTop: 6,
                        fontWeight: "bold",
                    }}>{currentDisplayName}</Text>

                    <TextInput
                        style={styles.input_changeName}
                        placeholder="Enter New Display Name"
                        placeholderTextColor="#9ca3af"
                        onKeyPress={() => { setShowNulldisplayNameerror(false) }}
                        onChange={(e) => {

                            setNewDisplayName(e.nativeEvent.text)

                        }}
                        value={newDisplayName}
                    />
                    {showNulldisplayNameerror && <Text
                        style={{
                            color: "#ef4444", fontSize: 13, paddingBottom: 10, textAlign: "center",
                        }}

                    >{"Display Name cannot be empty"}</Text>}

                    <TouchableOpacity
                        onPress={handleChangeDisplayName}
                    >
                        <View style={styles.buttons}>
                            <Text style={{ color: "#9ca3af" }}>Change</Text>
                        </View>
                    </TouchableOpacity>

                    <Pressable onPress={() => {
                        setIsEditNameClicked(false);
                        setNewDisplayName("");
                        setShowNulldisplayNameerror(false);
                    }}>
                        <Text style={{
                            color: "#ef4444",
                            textAlign: "center",
                            marginVertical: 10
                        }}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>)
    }

    function DeleteChatPrompt() {

        // make a chat function
        const handleChatDelete = () => {

            router.back();
            Toast.show({
                type: 'success',
                text1: 'ChatXYZ Deleted',
            })


        };


        return (<Modal
            visible={isDeletedClicked}
            transparent
            animationType="fade"
            onRequestClose={() => {
                setIsDeletedClicked(false);
            }}
        >
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.title}>Are you sure?</Text>
                    <Text style={styles.message}>This Chat will be deleted permanently.</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => {
                                setIsDeletedClicked(false);
                            }}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={handleChatDelete}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>)
    }

    return (
        <KeyboardAvoidingView
            style={styles.avoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            {/* OverLay for 3dot menu */}
            {isThreeDotOpen && <Overlay onPress={() => { setIsThreeDotOpen(false) }} />}



            <View style={styles.container}>
                {messageSelected ? <HeaderAfterMsgSelected /> : <HeaderBeforeMsgSelected />}


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

            {/* Edit Dispplay Name */}
            {<EditDisplayName />}

            {/* Delete Chat Prompt */}
            {<DeleteChatPrompt />}



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
        backgroundColor: "#1f2937",
        alignSelf: 'flex-end',
        borderRadius: 16
    },
    otherMessage: {
        backgroundColor: colors.cardBackground,
        alignSelf: 'flex-start',
        borderRadius: 16
    },
    myMessageText: {
        fontSize: 16,
        color: "#45f248"
    },
    otherMessageText: {
        fontSize: 16,
        color: "#06b6d4"
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
    threeDotMenu: {
        position: 'absolute',
        top: 37,
        right: 5,
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
    },
    container_Modal: {
        width: "100%",
        backgroundColor: "#1f2937",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 5,
    },
    buttons: {
        width: "100%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#8249c2",
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
        alignSelf: "flex-start", // this keeps it to its content width
    },
    input_changeName: {
        width: "100%",
        backgroundColor: "#374151",
        borderWidth: 0.5,
        borderColor: "#454f5e",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
        color: "white"
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#eee',
    },
    cancelText: {
        color: '#555',
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#d9534f',
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
    }
});
