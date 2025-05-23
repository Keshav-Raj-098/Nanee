import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { useState, useEffect } from "react";
import logo from "@/assets/images/Nanee_logo.png";
import CustomButton from "@/components/ui/Button";
import { storeData, getData } from "@/lib/utils";
import { router } from 'expo-router';



export default function LoginScreen() {

    const [title, setTitle] = useState("Create Your Password");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [btnTitle, setBtnTitle] = useState("Set Password");
    const [state, setState] = useState("signup"); // signup, login, changePassword

    const handleClick = () => {
        if (state === "signup") {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            storeData({ key: "password", value: password });
            alert("Password set successfully");
            router.replace("/");
        }
        else if (state === "login") {
            getData("password").then((data) => {
                if (data !== password) {
                    alert("Incorrect Password");
                } else {
                    alert("Password is correct");
                    router.replace("/");
                }
            });
        }
        else if (state === "changePassword") {
            getData("password").then((data) => {
                if (data !== oldPassword) {
                    alert("Incorrect Old Password");
                } else {
                    storeData({ key: "password", value: password });
                    alert("Password changed successfully");
                    router.replace("/");
                }
            });
        }
    }


    useEffect(() => {
        if (state === "signup") {
            setTitle("Create Your Password");
            setBtnTitle("Set Password");
        }
        else if (state === "login") {
            router.replace("/");
            return;
            setTitle("Enter Your Password");
            setBtnTitle("Unlock nanee");
        }
        else if (state === "changePassword") {
            setTitle("Verify Old Password");
            setBtnTitle("Set New Password");
        }

    }, [state]);

    useEffect(() => {
        getData("password").then((data) => {
            if (data) setState("login");
        });
    }, [])



    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
                keyboardShouldPersistTaps="handled"
            >
                <Image source={logo} style={styles.image} />
                <Text style={{ color: "white", fontSize: 40, fontWeight: "bold", marginBottom: 5 }}>nanee</Text>
                <Text style={{ color: "#9ca3af", fontSize: 15, marginBottom: 35 }}>
                    Private. Secure. Untraceable Messaging.
                </Text>

                <View style={styles.container}>
                    <Text style={styles.heading}>{

                        title

                    }</Text>

                    {state === "changePassword" && <TextInput
                        placeholder="Current Password"
                        placeholderTextColor="#ccc"
                        value={oldPassword}
                        onChangeText={(text) => setOldPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />}
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#ccc"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="#ccc"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={[
                            styles.input,
                            state === "login" ? { display: "none" } : {}
                        ]} // 
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={{ width: "100%" }}
                        onPress={handleClick}>
                        <CustomButton
                            btnTitle={btnTitle}
                            textColor="#06b6d4"
                            borderColor="#06b6d4"
                        />

                    </TouchableOpacity>

                    {state === "login" && <TouchableOpacity
                        style={{ width: "100%", marginTop: 10 }}
                        onPress={() => {

                            setState("changePassword");
                            setTitle("Change Password");
                            setBtnTitle("Set New Password");
                        }}>
                        <CustomButton btnTitle={"Change Passowrd"} textColor="#eab308" borderColor="#eab308" />
                    </TouchableOpacity>}
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 125,
        height: 125,
        marginBottom: 15,
    },
    container: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#090c14",
        borderColor: "rgb(31 41 55)",
        borderWidth: 1,
        borderRadius: 10,
        maxWidth: 350,

    },

    heading: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        borderColor: "transparent",
        paddingHorizontal: 10,
        color: "white",
        marginVertical: 10,
        backgroundColor: "#4b5563",
        borderRadius: 5,
    },

});
