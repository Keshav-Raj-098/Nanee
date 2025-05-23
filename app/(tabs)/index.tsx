import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/ui/Button';
import Button from '@/components/ui/Button';

export default function HomeScreen() {
  const [accntNo, setAccntNo] = useState("224568");
  const [publicKey, setPublicKey] = useState("0x1234567890abcdef1234567890abcdef12345678");
  const [privateKey, setPrivateKey] = useState("0xabcdef1234567890abcdef1234567890abcdef12");

  return (

    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.mainContainer}>
          <Text
            style={{ color: "#9ca3af", fontSize: 17 }}
          >{`Account Created Globally:${accntNo}`}</Text>

          <View style={styles.container}>
            <Text style={styles.cardTitle} >Your Keys</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>


              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: 15,
                }}
              >Public </Text>
              <Text style={{ color: "#9ca3af" }}>Icon</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <TouchableOpacity >
                <View style={styles.buttons}>
                  <Text style={{ color: "#9ca3af" }}>Show QR</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity >
                <View style={styles.buttons}>
                  <Text style={{ color: "#9ca3af" }}>Copy Key</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity >
                <View style={styles.buttons}>
                  <Text style={{ color: "#9ca3af" }}>Scan QR</Text>
                </View>
              </TouchableOpacity>
            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25 }}>

              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: 15,
                }}
              >Private </Text>
              <Text style={{ color: "#9ca3af" }}>Icon</Text>
            </View>

          </View>

          <View style={styles.container}>

            <Text style={styles.cardTitle}>Recover Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Paste Your Private Key"
              placeholderTextColor="#9ca3af"
            />


            <TouchableOpacity >
              <View style={{ ...styles.buttons, backgroundColor: "#111827", width: "100%", alignItems: "center",borderColor:"#06b6d4",borderRadius:15,marginBottom:10 }}>
                <Text style={{ color: "#9ca3af" }}>Recover</Text>
              </View>
            </TouchableOpacity>

          </View>



        </View>
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'black', paddingVertical: 25, color: "#fff" },

  container: {
    width: "100%",
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 15,
  },
  cardTitle: {
    color: "#9ca3af",
    fontSize: 19,
    fontWeight: "bold",
  },
  buttons: {
    // height: 50,
    borderWidth: 1,
    borderColor: "#8249c2",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start", // this keeps it to its content width
  },
  input: {
    width: "100%",
    backgroundColor: "#374151",
    borderWidth: 0.5,
    borderColor: "#454f5e",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 15,
    color:"white"
  }
});

