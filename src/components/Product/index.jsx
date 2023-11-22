import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import AppContext from '../../context/AppContext';
import useStyles from './style';

export default function Product() {
  const { theme } = useContext(AppContext);
  const styles = useStyles(theme);

  const [establishment, setEstablishment] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
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

  useEffect(() => {
    calculatePriceTarget(quantityTargetA, 'A');
    calculatePriceTarget(quantityTargetB, 'B');
    calculatePriceTarget(quantityTargetC, 'C');
    calculatePriceTarget(quantityTargetD, 'D');
  }, [quantity, price]);

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
    }
  };

  const handlePriceChange = async (newText) => {
    if (validateNumber(newText)) {
      setPrice(newText);
    }
  };

  const calculatePriceTarget = async (value, column) => {
    if (validateNumber(value)) {
      const cost = await calculateProportion(price, quantity, value);

      if (cost) {
        switch (column) {
          case 'A':
            setPriceTargetA(cost);
            break;
          case 'B':
            setPriceTargetB(cost);
            break;
          case 'C':
            setPriceTargetC(cost);
            break;
          case 'D':
            setPriceTargetD(cost);
            break;
          default:
            break;
        }
      }
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
        Preencha o produto, a quantidade em UN/ML/GR, o Preço e altere os campos
        em azul para saber quanto um produto custa em uma quantidade
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
        <Text style={[styles.pricesHeaderRow, styles.pricesHeaderRowTop]}>
          Qtde
        </Text>
        <Text style={[styles.pricesHeaderRow, styles.pricesHeaderRowTop]}>
          Preço
        </Text>
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
          style={[styles.priceRow, styles.priceRowTop]}
          placeholder="0"
          placeholderTextColor={'#FFF'}
          value={quantity}
          onChangeText={(newText) => handleQuantityChange(newText)}
          selectTextOnFocus
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.priceRow, styles.priceRowTop]}
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
            style={[
              styles.pricesHeaderRow,
              styles.pricesHeaderRowEditable,
              styles.pricesHeaderRowBottom,
            ]}
            placeholder="ML/GR"
            placeholderTextColor={'#FFF'}
            keyboardType="numeric"
            value={quantityTargetA}
            onChangeText={(newText) => {
              calculatePriceTarget(newText, 'A');
              setQuantityTargetA(newText);
            }}
            selectTextOnFocus
          />
          <TextInput
            style={[
              styles.pricesHeaderRow,
              styles.pricesHeaderRowEditable,
              styles.pricesHeaderRowBottom,
            ]}
            placeholder="ML/GR"
            placeholderTextColor={'#FFF'}
            keyboardType="numeric"
            value={quantityTargetB}
            onChangeText={(newText) => {
              calculatePriceTarget(newText, 'B');
              setQuantityTargetB(newText);
            }}
            selectTextOnFocus
          />
          <TextInput
            style={[
              styles.pricesHeaderRow,
              styles.pricesHeaderRowEditable,
              styles.pricesHeaderRowBottom,
            ]}
            placeholder="ML/GR"
            placeholderTextColor={'#FFF'}
            keyboardType="numeric"
            value={quantityTargetC}
            onChangeText={(newText) => {
              calculatePriceTarget(newText, 'C');
              setQuantityTargetC(newText);
            }}
            selectTextOnFocus
          />
          <TextInput
            style={[
              styles.pricesHeaderRow,
              styles.pricesHeaderRowEditable,
              styles.pricesHeaderRowBottom,
            ]}
            placeholder="ML/GR"
            placeholderTextColor={'#FFF'}
            keyboardType="numeric"
            value={quantityTargetD}
            onChangeText={(newText) => {
              calculatePriceTarget(newText, 'D');
              setQuantityTargetD(newText);
            }}
            selectTextOnFocus
          />
        </View>
        <View style={styles.priceRowContainer}>
          <TextInput
            style={[styles.priceRow, styles.priceTarget, styles.priceRowBottom]}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
            value={priceTargetA}
            onChangeText={(newText) => setPriceTargetA(newText)}
            editable={false}
          />
          <TextInput
            style={[styles.priceRow, styles.priceTarget, styles.priceRowBottom]}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
            value={priceTargetB}
            onChangeText={(newText) => setPriceTargetB(newText)}
            editable={false}
          />
          <TextInput
            style={[styles.priceRow, styles.priceTarget, styles.priceRowBottom]}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
            value={priceTargetC}
            onChangeText={(newText) => setPriceTargetC(newText)}
            editable={false}
          />
          <TextInput
            style={[styles.priceRow, styles.priceTarget, styles.priceRowBottom]}
            placeholder="0,00"
            placeholderTextColor={'#FFF'}
            value={priceTargetD}
            onChangeText={(newText) => setPriceTargetD(newText)}
            editable={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}
