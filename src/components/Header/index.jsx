import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comparador de Preços</Text>
    </View>
  );
}
