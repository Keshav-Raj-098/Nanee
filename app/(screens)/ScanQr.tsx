import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

export default function ScanQr() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        Alert.alert(
            "Camera Permission Needed",
            "We need your permission to access the camera.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Grant Permission",
                    onPress: () => requestPermission(),
                },
            ],
            { cancelable: true }
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function handleBarcodeScanned(result: BarcodeScanningResult) {
        if (!scanned) {
            setScanned(true);
            const key = result.data;
            const inDb = false; // Replace with actual logic to check if the key is in the database
            if (inDb) {
                // Redirect the user to the new chat page with the the user having that key
            }
            if (!inDb) {
                Alert.alert('QR Code Scanned', "", [
                    {
                        text: 'Scan Again',
                        onPress: () => setScanned(false),
                    },
                ]);
            }
            else {
                Alert.alert('Unable to Scan', "", [
                    {
                        text: 'Ok',
                        onPress: () => { setScanned(false); router.back(); },
                    },
                ]);

            }
        }
    }

    return (
        <View style={styles.container}>

            <CameraView
                style={styles.camera}
                facing={facing}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { router.back(); }} style={styles.button}>
                        <MaterialIcons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialIcons name="flip-camera-ios" size={36} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 25,
        padding: 20,
        position: 'absolute',
        top: 30,
        alignItems: 'flex-end',
        width: '100%',
    },
    button: {
        flex: 1,
        // alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
