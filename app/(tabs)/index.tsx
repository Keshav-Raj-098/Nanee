import { useFocusEffect } from '@react-navigation/native';
import { Modal, Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { copyToClipboard } from '@/lib/utils';
import QRCodeDisplay from '@/components/Qrdisplay';
import ScanQr from '@/components/ScanQr';




export default function HomeScreen() {
  const [accntNo, setAccntNo] = useState("224568");
  const [publicKey, setPublicKey] = useState("0x1234567890abcdef1234567890abcdef12345678");
  const [privateKey, setPrivateKey] = useState("0xabcdef1234567890abcdef1234567890abcdef12");
  const [recoverKey, setRecoverKey] = useState("");

  const [showPublickey, setShowPublickey] = useState<boolean>(false);
  const [showPrivatekey, setShowPrivatekey] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [scanQr, setScanQr] = useState<boolean>(false);



  useFocusEffect(
    useCallback(() => {
      // Reset your useState variables when this screen is focused
      setShowQR(false);
      setScanQr(false);
      setShowPublickey(false);
      setShowPrivatekey(false);
      setRecoverKey("");
      // You can also reset other state variables if needed
      return () => {
        // Optional: cleanup logic if needed when screen loses focus
      };
    }, [])
  );

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>

        {scanQr ? <ScanQr setScanQr={setScanQr} /> :
          <ScrollView style={{ width: "100%", }} showsVerticalScrollIndicator={false}>
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
                  <MaterialIcons name={`${showPublickey ? "visibility-off" : "visibility"}`} size={24} color="#9ca3af" onPress={() => {
                    setShowPublickey(!showPublickey);
                  }} />

                </View>
                <View style={{ width: "90%", marginVertical: 10, height: 40 }}>
                  {
                    showPublickey ? (
                      <Text style={{ color: "#9ca3af" }}>{publicKey}</Text>
                    ) : (
                      <Text style={{ color: "#9ca3af", fontSize: 16 }}>
                        {"*".repeat(publicKey.length)}
                      </Text>
                    )
                  }
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => setShowQR(true)}
                  >
                    <View style={styles.buttons}>
                      <Text style={{ color: "#9ca3af" }}>Show QR</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      copyToClipboard(publicKey);
                      Toast.show({
                        type: 'success',
                        text1: 'Copied to clipboard',
                        swipeable: true,
                        position: 'top',
                        visibilityTime: 900,
                      });

                    }}>
                    <View style={styles.buttons} >
                      <Text style={{ color: "#9ca3af" }}>Copy Key</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setScanQr(true)
                    }}
                  >
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
                  <MaterialIcons name={`${showPrivatekey ? "visibility-off" : "visibility"}`} size={24} color="#9ca3af" onPress={() => {
                    setShowPrivatekey(!showPrivatekey);
                  }} />
                </View>
                <View style={{ width: "90%", marginVertical: 10, height: 40 }}>
                  {
                    showPrivatekey ? (
                      <Text style={{ color: "#9ca3af" }}>{privateKey}</Text>
                    ) : (
                      <Text style={{ color: "#9ca3af", fontSize: 16 }}>
                        {"*".repeat(privateKey.length)}
                      </Text>
                    )
                  }
                </View>

              </View>

              <View style={styles.container}>

                <Text style={styles.cardTitle}>Recover Account</Text>
                <TextInput
                  style={styles.input}
                  value={recoverKey}
                  onChange={(e) => setRecoverKey(e.nativeEvent.text)}
                  placeholder="Paste Your Private Key"
                  placeholderTextColor="#9ca3af"
                />


                <TouchableOpacity >
                  <View style={{ ...styles.buttons, backgroundColor: "#111827", width: "100%", alignItems: "center", borderColor: "#06b6d4", borderRadius: 15, marginBottom: 10 }}>
                    <Text style={{ color: "#9ca3af" }}>Recover</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        }
      </SafeAreaView >
      <Modal
        transparent
        animationType="slide"
        visible={showQR} // ✅ Use state here
        onRequestClose={() => setShowQR(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <QRCodeDisplay value={publicKey} size={200} title='Scan this QR' />
            <Pressable onPress={() => setShowQR(false)}
              style={styles.closeButton}>
              <Text style={{ color: "#9ca3af", fontSize: 16 }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  mainContainer: { flex: 1, flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'black', paddingVertical: 25, color: "#fff", paddingHorizontal: 15 },

  container: {
    width: "100%",
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
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
    color: "white"
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
  }
});

