import { StatusBar, StyleSheet } from 'react-native';

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: statusBarHeight,
    paddingStart: 14,
    paddingBottom: 8,
    backgroundColor: '#282829',
  },
  logo: {
    width: 40,
    height: 40,
  },
  icon: {
    color: '#D6D585',
    marginRight: 14,
    width: 40,
    height: 40,
  },
});

export default styles;
