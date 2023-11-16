import { StatusBar, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: statusBarHeight,
      paddingStart: 14,
      paddingBottom: 8,
      backgroundColor: colors[theme].headerBackground,
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

export default useStyles;
