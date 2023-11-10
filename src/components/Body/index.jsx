import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './style';

export default function Body() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Insira a Marca, a quantidade em ML ou GR, o Preço e altere os campos em
        azul para saber quanto um produto custa em uma quantidade (ML/GR)
      </Text>
    </ScrollView>
  );
}
