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

import Select from '../Select';
import AppContext from '../../context/AppContext';
import useStyles from './style';

export default function Body() {
  const viewShotRef1 = useRef();

  const { theme } = useContext(AppContext);
  const styles = useStyles(theme);

  const [selectedItem, setSelectedItem] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const [quantityTarget, setQuantityTarget] = useState('ML/GR');
  const [priceTarget, setPriceTarget] = useState(['0,00']);

  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('0.00');
  const [price, setPrice] = useState('0,00');

  const [quantityTargetA, setQuantityTargetA] = useState('1');
  const [quantityTargetB, setQuantityTargetB] = useState('269');
  const [quantityTargetC, setQuantityTargetC] = useState('300');
  const [quantityTargetD, setQuantityTargetD] = useState('1000');

  const [priceTargetA, setPriceTargetA] = useState('0.00');
  const [priceTargetB, setPriceTargetB] = useState('0.00');
  const [priceTargetC, setPriceTargetC] = useState('0.00');
  const [priceTargetD, setPriceTargetD] = useState('0.00');

  const validateNumber = (inputValue) => {
    const numberRegex = /^\d*\.?\d*$/;

    if (!numberRegex.test(String(inputValue).replace(',', '.'))) {
      alert('Erro. Por favor, insira um número válido.');
      return false;
    }
    return true;
  };

  const handleQuantityChange = async (newText) => {
    if (validateNumber(newText)) {
      setQuantity(newText);

      const cost = await calculateProportion(price, newText, quantityTarget);
      if (cost) {
        setPriceTargetA(cost);
      }
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
    return (
      (Number(newQt.replace(',', '.')) * Number(pr.replace(',', '.'))) /
      Number(qt.replace(',', '.'))
    ).toFixed(2);
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
        Escolha/digite o produto, a quantidade em ML/GR, o Preço e altere o
        campo ML/GR em azul para saber quanto um produto custa em uma quantidade
      </Text>

      <ViewShot ref={viewShotRef1} options={{ format: 'png', quality: 0.9 }}>
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
          <Text style={styles.pricesHeaderRow}>Quantidade</Text>
          <Text style={styles.pricesHeaderRow}>Preço</Text>
        </View>

        <View style={styles.priceRowContainer}>
          <TextInput
            style={[styles.priceRow, styles.productInput]}
            placeholder="Digite"
            placeholderTextColor={'#FFF'}
            value={product}
            onChangeText={(newText) => setProduct(newText)}
            selectTextOnFocus
          />

          <TextInput
            style={styles.priceRow}
            placeholder="0.00"
            placeholderTextColor={'#FFF'}
            value={quantity}
            onChangeText={(newText) => handleQuantityChange(newText)}
            selectTextOnFocus
            keyboardType="numeric"
          />
          <TextInput
            style={styles.priceRow}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
            value={price}
            onChangeText={(newText) => handlePriceChange(newText)}
            selectTextOnFocus
            keyboardType="numeric"
          />
        </View>

        <View>
          <View style={styles.pricesHeader}>
            <TextInput
              style={[styles.pricesHeaderRow, styles.pricesHeaderRowEditable]}
              placeholder="ML/GR"
              placeholderTextColor={'#FFF'}
              keyboardType="numeric"
              value={quantityTargetA}
              onChangeText={(newText) => calculatePriceTarget(newText)}
              selectTextOnFocus
            />
            <TextInput
              style={[styles.pricesHeaderRow, styles.pricesHeaderRowEditable]}
              placeholder="ML/GR"
              placeholderTextColor={'#FFF'}
              keyboardType="numeric"
              value={quantityTargetB}
              onChangeText={(newText) => calculatePriceTarget(newText)}
              selectTextOnFocus
            />
            <TextInput
              style={[styles.pricesHeaderRow, styles.pricesHeaderRowEditable]}
              placeholder="ML/GR"
              placeholderTextColor={'#FFF'}
              keyboardType="numeric"
              value={quantityTargetC}
              onChangeText={(newText) => calculatePriceTarget(newText)}
              selectTextOnFocus
            />
            <TextInput
              style={[styles.pricesHeaderRow, styles.pricesHeaderRowEditable]}
              placeholder="ML/GR"
              placeholderTextColor={'#FFF'}
              keyboardType="numeric"
              value={quantityTargetD}
              onChangeText={(newText) => calculatePriceTarget(newText)}
              selectTextOnFocus
            />
          </View>
          <View style={styles.priceRowContainer}>
            <TextInput
              style={[styles.priceRow, styles.priceTarget]}
              placeholder="0,00"
              placeholderTextColor={'#FFF'}
              value={priceTargetA}
              onChangeText={(newText) => handlePriceTargetChange(newText)}
              editable={false}
            />
            <TextInput
              style={[styles.priceRow, styles.priceTarget]}
              placeholder="0,00"
              placeholderTextColor={'#FFF'}
              value={priceTargetB}
              onChangeText={(newText) => handlePriceTargetChange(newText)}
              editable={false}
            />
            <TextInput
              style={[styles.priceRow, styles.priceTarget]}
              placeholder="0,00"
              placeholderTextColor={'#FFF'}
              value={priceTargetC}
              onChangeText={(newText) => handlePriceTargetChange(newText)}
              editable={false}
            />
            <TextInput
              style={[styles.priceRow, styles.priceTarget]}
              placeholder="0,00"
              placeholderTextColor={'#FFF'}
              value={priceTargetD}
              onChangeText={(newText) => handlePriceTargetChange(newText)}
              editable={false}
            />
          </View>
        </View>
      </ViewShot>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Entypo
            style={styles.buttonIcon}
            name="plus"
            size={24}
            color="#448f44"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign
            style={styles.buttonIcon}
            name="delete"
            size={24}
            color="#f14d4d"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => captureScreen(viewShotRef1)}
        >
          <Ionicons name="print" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
