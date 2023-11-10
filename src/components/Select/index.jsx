import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

export default function Select({ options, placeholder, setSelectedItem }) {
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const filterData = (text) => {
    const filteredDataAux = options.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredDataAux);
    setSelectIsOpen(true);
  };

  const handlePress = () => {
    if (selectIsOpen) {
      setFilteredData('');
    } else {
      filterData('');
    }
    setSelectIsOpen(!selectIsOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="#e1e2df80"
          onChangeText={(newText) => {
            setValue(newText);
            filterData(newText);
          }}
          selectTextOnFocus
          value={value}
        />
        <MaterialCommunityIcons
          style={styles.inputIcon}
          onPress={() => handlePress()}
          name={selectIsOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#e1e2df80"
        />
      </View>
      <FlatList
        style={styles.flatlist}
        data={filteredData}
        contentContainerStyle={styles.flatlistContainerStyle}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.flatlistItem}
            onPress={() => {
              setValue(item);
              setSelectedItem(item);
              setFilteredData('');
              setSelectIsOpen(false);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

Select.propTypes = {
  data: PropTypes.any,
  placeholder: PropTypes.any,
  setSelectedItem: PropTypes.any,
}.isRequired;
