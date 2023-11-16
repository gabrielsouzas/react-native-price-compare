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
    },
    input: {
      borderWidth: 0,
      paddingLeft: 0,
      paddingRight: 5,
      outlineWidth: 0,
      color: colors[theme].tableRowText,
      // paddingBottom: 4,
      outlineWidth: 0,

      width: '100%',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    inputIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    flatlist: {
      position: 'absolute',
      width: '100%',
      fontSize: '1rem',
      borderRadius: 8,
      top: 46,
      left: 0,
      marginBottom: 2,
      maxHeight: 250,
      zIndex: 9999,
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
    },
    itemTitle: {
      fontSize: '1rem',
      color: colors[theme].tableRowText,
    },
  });

export default useStyles;
