import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


import SvgQRCode from 'react-native-qrcode-svg';

// Simple usage, defaults for all but the value
function Simple({serialNo}) {
  return <SvgQRCode value={serialNo} />;
}

export default function App() {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Simple />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
