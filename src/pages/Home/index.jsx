import React, { useContext } from 'react';
import { StatusBar, View } from 'react-native';
import Header from '../../components/Header';
import AppContext from '../../context/AppContext';
import useStyles from './style';
import Product from '../../components/Product';
import colors from '../../utils/colors';

export default function Home() {
  const { theme } = useContext(AppContext);
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        backgroundColor={colors[theme].background}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        showHideTransition="fade"
        hidden={false}
      />
      <Header />
      <Product />
    </View>
  );
}
