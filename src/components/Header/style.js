import { StatusBar, StyleSheet } from 'react-native';

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight,
    paddingStart: 14,
    paddingBottom: 8,
    backgroundColor: '#282829',
  },
  text: {
    color: '#FFF',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default styles;
