import React, { useContext, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';

import AppContext from '../../context/AppContext';
import useStyles from './style';

export default function ProductList() {
  const viewShotRef1 = useRef();

  const { theme } = useContext(AppContext);
  const styles = useStyles(theme);

  const [establishment, setEstablishment] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [product, setProduct] = useState(['']);
  const [quantity, setQuantity] = useState(['0']);
  const [price, setPrice] = useState(['0,00']);
  const [quantityTarget, setQuantityTarget] = useState('ML/GR');
  const [priceTarget, setPriceTarget] = useState(['0,00']);

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

  const handleProductChange = (newText, index) => {
    const newProduct = [...product];
    newProduct[index] = newText;
    setProduct(newProduct);
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
    try {
      const newQuantity = Number(newQt.replace(',', '.'));
      const price = Number(pr.replace(',', '.'));
      const quantity = Number(qt.replace(',', '.'));

      const proportion = ((newQuantity * price) / quantity).toFixed(2);

      if (!isNaN(proportion) && isFinite(proportion)) {
        return proportion;
      } else {
        return 'N/A';
      }
    } catch (error) {
      console.log(`Erro ao calcular proporção. Erro ${error}`);
      return 0;
    }

    /* return (
      (Number(newQt.replace(',', '.')) * Number(pr.replace(',', '.'))) /
      Number(qt.replace(',', '.'))
    ).toFixed(2); */
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

  const captureScreen = async (viewRef) => {
    try {
      const uri = await viewRef.current.capture();
      console.log('Imagem capturada:', uri);
    } catch (error) {
      console.error('Erro ao capturar a tela:', error);
    }
  };

  return (
    <ScrollView vertical style={styles.container}>
      <Text style={styles.title}>
        Preencha o produto, a quantidade em UN/ML/GR, o Preço e altere o campo
        ML/GR em azul para saber quanto um produto custa em uma quantidade
      </Text>

      <View style={styles.info}>
        <TextInput
          style={[styles.infoInput, styles.establishmentInput]}
          placeholder="Estabelecimento"
          placeholderTextColor={'#FFF'}
          textAlign="center"
          value={establishment}
          onChangeText={(newText) => setEstablishment(newText)}
          selectTextOnFocus
          onBlur={() => {
            if (!establishment) {
              setEstablishment(''); // Reseta para uma string vazia se o texto for removido
            }
          }}
        />

        <TextInput
          style={[styles.infoInput, styles.dateInput]}
          placeholder="Data"
          placeholderTextColor={'#FFF'}
          value={date}
          onChangeText={(newText) => setDate(newText)}
          selectTextOnFocus
        />
      </View>

      <View style={styles.pricesHeader}>
        <Text style={styles.pricesHeaderRowProduto}>Produto</Text>
        <Text style={styles.pricesHeaderRow}>Qtde</Text>
        <Text style={styles.pricesHeaderRow}>Preço</Text>
        <TextInput
          style={[styles.pricesHeaderRow, styles.pricesHeaderRowEditable]}
          placeholder="ML/GR"
          placeholderTextColor={'#FFF'}
          keyboardType="numeric"
          value={quantityTarget}
          onChangeText={(newText) => calculatePriceTarget(newText)}
          selectTextOnFocus
        />
      </View>

      {quantity.map((value, index) => (
        <View key={index} style={styles.priceRowContainer}>
          {/*<Select
              options={options}
              placeholder="Sel/Dig"
              setSelectedItem={setSelectedItem}
            />*/}

          <TextInput
            style={[styles.priceRow, styles.productInput]}
            placeholder="Digite"
            placeholderTextColor={'#FFF'}
            value={product[index]}
            onChangeText={(newText) => handleProductChange(newText, index)}
            selectTextOnFocus
          />

          <TextInput
            style={styles.priceRow}
            placeholder="0.00"
            placeholderTextColor={'#FFF'}
            value={quantity[index]}
            onChangeText={(newText) => handleQuantityChange(newText, index)}
            selectTextOnFocus
            keyboardType="numeric"
          />
          <TextInput
            style={styles.priceRow}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
            value={price[index]}
            onChangeText={(newText) => handlePriceChange(newText, index)}
            selectTextOnFocus
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.priceRow, styles.priceTarget]}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
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
            color="#448f44"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteRow}>
          <AntDesign
            style={styles.buttonIcon}
            name="delete"
            size={24}
            color="#f14d4d"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
