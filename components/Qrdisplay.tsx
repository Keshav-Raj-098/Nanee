import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';


type QRCodeDisplayProps = {
    value: string;
    size: number | 200;
    title?: string;
}


const QRCodeDisplay = ({ value, size, title }:QRCodeDisplayProps) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <QRCode
        value={value}
        size={size}
        backgroundColor="white"
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    padding:10,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
});



export default QRCodeDisplay;
