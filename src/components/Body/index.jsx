import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';

import Select from '../Select';
import styles from './style';
import { TouchableOpacity } from 'react-native-web';

export default function Body() {
  const [selectedItem, setSelectedItem] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [quantity, setQuantity] = useState(['0.00']);
  const [price, setPrice] = useState(['0,00']);
  const [quantityTarget, setQuantityTarget] = useState('ML/GR');
  const [priceTarget, setPriceTarget] = useState(['0,00']);

  const options = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const validateNumber = (inputValue) => {
    const numberRegex = /^\d*\.?\d*$/;

    if (!numberRegex.test(String(inputValue).replace(',', '.'))) {
      alert('Erro. Por favor, insira um número válido.');
      return false;
    }
    return true;
  };

  const handleQuantityChange = async (newText, index) => {
    if (validateNumber(newText)) {
      const newQuantity = [...quantity];
      newQuantity[index] = newText;
      setQuantity(newQuantity);

      const newPriceTarget = [...priceTarget];

      const cost = await calculateProportion(
        price[index],
        newText,
        quantityTarget
      );
      if (cost) {
        newPriceTarget[index] = cost;
      }

      setPriceTarget(newPriceTarget);
    }
  };

  const handlePriceChange = async (newText, index) => {
    if (validateNumber(newText)) {
      const newPrice = [...price];
      newPrice[index] = newText;
      setPrice(newPrice);

      const newPriceTarget = [...priceTarget];

      const cost = await calculateProportion(
        newText,
        quantity[index],
        quantityTarget
      );
      if (cost) {
        newPriceTarget[index] = cost;
      }

      setPriceTarget(newPriceTarget);
    }
  };

  const handlePriceTargetChange = (newText, index) => {
    if (validateNumber(newText)) {
      const newPriceTarget = [...priceTarget];
      newPriceTarget[index] = newText;
      setPriceTarget(newPriceTarget);
    }
  };

  const calculatePriceTarget = async (value) => {
    if (validateNumber(value)) {
      setQuantityTarget(value);

      const newPriceTarget = [...priceTarget];

      for (let i = 0; i < quantity.length; i++) {
        const cost = await calculateProportion(price[i], quantity[i], value);
        if (cost) {
          newPriceTarget[i] = cost;
        }
      }

      setPriceTarget(newPriceTarget);
    }
  };

  const calculateProportion = (pr, qt, newQt) => {
    /* try {
      const newQuantity = Number(newQt.replace(',', '.'));
      const price = Number(pr.replace(',', '.'));
      const quantity = Number(qt.replace(',', '.'));

      const proportion = ((newQuantity * price) / quantity).toFixed(2);

      if (!isNaN(proportion) && isFinite(proportion)) {
        return proportion;
      }

      return 0;
    } catch (error) {
      console.log(`Erro ao calcular proporção. Erro ${error}`);
      // alert('Preencha os campos com números reais.');
      return 0;
    } */

    return (
      (Number(newQt.replace(',', '.')) * Number(pr.replace(',', '.'))) /
      Number(qt.replace(',', '.'))
    ).toFixed(2);
  };

  const addRow = () => {
    const newQuantity = [...quantity];
    newQuantity.push('0.00');

    const newPrice = [...price];
    newPrice.push('0.00');

    const newPriceTarget = [...priceTarget];
    newPriceTarget.push('0.00');

    setQuantity(newQuantity);
    setPrice(newPrice);
    setPriceTarget(newPriceTarget);
  };

  const deleteRow = () => {
    const newQuantity = [...quantity];
    newQuantity.pop();

    const newPrice = [...price];
    newPrice.pop();

    const newPriceTarget = [...priceTarget];
    newPriceTarget.pop();

    setQuantity(newQuantity);
    setPrice(newPrice);
    setPriceTarget(newPriceTarget);
  };

  return (
    <ScrollView vertical style={styles.container}>
      <Text style={styles.title}>
        Insira a Marca, a quantidade em ML ou GR, o Preço e altere os campos em
        azul para saber quanto um produto custa em uma quantidade (ML/GR)
      </Text>

      <View style={styles.info}>
        <TextInput
          style={[styles.infoInput, styles.establishmentInput]}
          placeholder="Estabelecimento"
          value={establishment}
          onChangeText={(newText) => setEstablishment(newText)}
          selectTextOnFocus
        />

        <TextInput
          style={[styles.infoInput, styles.dateInput]}
          placeholder="Data"
          value={date}
          onChangeText={(newText) => setDate(newText)}
          selectTextOnFocus
        />
      </View>

      <View style={styles.pricesHeader}>
        <Text style={styles.pricesHeaderRowProduto}>Produto</Text>
        <Text style={styles.pricesHeaderRow}>ML/GR</Text>
        <Text style={styles.pricesHeaderRow}>Preço</Text>
        <TextInput
          style={[styles.pricesHeaderRow, styles.pricesHeaderRowEditable]}
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
            editable={false}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addRow}>
          <Entypo
            style={styles.buttonIcon}
            name="plus"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteRow}>
          <AntDesign
            style={styles.buttonIcon}
            name="delete"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
