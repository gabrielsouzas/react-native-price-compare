import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import Select from '../Select';
import styles from './style';

export default function Body() {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(['0.00']);
  const [price, setPrice] = useState(['0,00']);
  const [quantityTarget, setQuantityTarget] = useState('ML/GR');
  const [priceTarget, setPriceTarget] = useState(['0,00']);

  const options = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const handleQuantityChange = (newText, index) => {
    const newQuantity = [...quantity];
    newQuantity[index] = newText;
    setQuantity(newQuantity);
  };

  const handlePriceChange = (newText, index) => {
    const newPrice = [...price];
    newPrice[index] = newText;
    setPrice(newPrice);
  };

  const handlePriceTargetChange = (newText, index) => {
    const newPriceTarget = [...priceTarget];
    newPriceTarget[index] = newText;
    setPriceTarget(newPriceTarget);
  };

  const calculatePriceTarget = async (value) => {
    setQuantityTarget(value);

    const newPriceTarget = [...priceTarget];

    for (let i = 0; i < quantity.length; i++) {
      const cost = await calculateProportion(price[i], quantity[i], value);
      newPriceTarget[i] = cost;
    }
    setPriceTarget(newPriceTarget);
  };

  const calculateProportion = (pr, qt, newQt) => {
    return ((Number(newQt) * Number(pr)) / Number(qt)).toFixed(2);
  };

  return (
    <ScrollView vertical style={styles.container}>
      <Text style={styles.title}>
        Insira a Marca, a quantidade em ML ou GR, o Preço e altere os campos em
        azul para saber quanto um produto custa em uma quantidade (ML/GR)
      </Text>

      <View style={styles.pricesHeader}>
        <Text style={styles.pricesHeaderRowProduto}>Produto</Text>
        <Text style={styles.pricesHeaderRow}>ML/GR</Text>
        <Text style={styles.pricesHeaderRow}>Preço</Text>
        <TextInput
          style={styles.pricesHeaderRow}
          placeholder="ML/GR"
          keyboardType="numeric"
          value={quantityTarget}
          onChangeText={(newText) => calculatePriceTarget(newText)}
          selectTextOnFocus
        />
      </View>

      {quantity.map((value, index) => (
        <View key={index} style={styles.priceRowContainer}>
          <Select
            options={options}
            placeholder="Sel/Dig"
            setSelectedItem={setSelectedItem}
          />

          <TextInput
            style={styles.priceRow}
            placeholder="0.00"
            value={quantity[index]}
            onChangeText={(newText) => handleQuantityChange(newText, index)}
            selectTextOnFocus
            keyboardType="numeric"
          />
          <TextInput
            style={styles.priceRow}
            placeholder="0,00"
            value={price[index]}
            onChangeText={(newText) => handlePriceChange(newText, index)}
            selectTextOnFocus
            keyboardType="numeric"
          />
          <TextInput
            style={styles.priceRow}
            placeholder="0,00"
            value={priceTarget[index]}
            onChangeText={(newText) => handlePriceTargetChange(newText, index)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
