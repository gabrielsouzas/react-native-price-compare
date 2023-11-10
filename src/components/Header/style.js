import { StatusBar, StyleSheet } from 'react-native';

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight,
    paddingStart: 14,
    backgroundColor: '#282829',
  },
  text: {
    color: '#FFF',
  },
});

export default styles;
