import React, { useContext } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import AppContext from '../../context/AppContext';
import useStyles from './style';
import ProductList from '../../components/ProductList';

export default function List() {
  const { theme } = useContext(AppContext);
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Header />
      <ProductList />
    </View>
  );
}
