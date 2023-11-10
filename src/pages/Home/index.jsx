import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/Body';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(68 68 75)',
  },
});
