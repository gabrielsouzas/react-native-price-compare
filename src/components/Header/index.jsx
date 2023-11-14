import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function Header() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../images/price_compare_logo.png')}
      />
      {(darkTheme && (
        <Ionicons
          onPress={() => setDarkTheme(!darkTheme)}
          style={styles.icon}
          name="sunny"
          size={30}
          color="black"
        />
      )) || (
        <Ionicons
          onPress={() => setDarkTheme(!darkTheme)}
          style={styles.icon}
          name="moon"
          size={30}
          color="black"
        />
      )}
    </View>
  );
}
