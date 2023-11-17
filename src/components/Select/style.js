import { StyleSheet } from 'react-native';

import colors from '../../utils/colors';

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].tableRowBackground,
      width: '34%',
      height: 'auto',
      textAlign: 'center',

      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      // paddingLeft: 8,
      borderRadius: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 0,
      paddingLeft: 5,
      alignItems: 'center',
    },
    input: {
      borderWidth: 0,
      paddingLeft: 0,
      //paddingRight: 5,
      // outlineWidth: 0,
      color: colors[theme].tableRowText,
      // paddingBottom: 4,
      // outlineWidth: 0,

      width: '80%',
      fontWeight: 'bold',
      fontSize: 16,
    },
    inputIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      height: '100%',
      fontWeight: 'bold',
      fontSize: 16,
    },
    flatlist: {
      position: 'absolute',
      width: '100%',
      fontSize: 16,
      borderRadius: 8,
      top: 54,
      left: 0,
      marginBottom: 2,
      maxHeight: 300,
    },
    flatlistContainerStyle: {},
    flatlistItem: {},
    item: {
      backgroundColor: colors[theme].tableRowBackground,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingTop: 5,
      marginBottom: 2,
      borderRadius: 8,

      height: 45,
      width: '100%',
      justifyContent: 'center',
    },
    itemTitle: {
      fontSize: 16,
      color: colors[theme].tableRowText,
    },
  });

export default useStyles;
