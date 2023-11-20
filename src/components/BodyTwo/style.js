import { StyleSheet } from 'react-native';

import colors from '../../utils/colors';

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginStart: 14,
      marginEnd: 14,
    },
    title: {
      marginTop: 8,
      color: colors[theme].text,
      fontSize: 16,
      textAlign: 'center',
    },
    info: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 4,
    },
    infoInput: {
      backgroundColor: colors[theme].infoBackground,
      textAlign: 'center',
      color: colors[theme].infoText,
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 8,
    },
    dateInput: {
      width: '40%',
      height: 'auto',
    },
    establishmentInput: {
      width: '55%',
      height: 'auto',
    },
    pricesHeader: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 14,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pricesHeaderRow: {
      backgroundColor: colors[theme].tableHeaderBackground,
      width: '20%',
      height: 'auto',
      textAlign: 'center',
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      paddingLeft: 8,
      borderRadius: 8,
    },
    pricesHeaderRowEditable: {
      color: '#161ab1',
    },
    pricesHeaderRowProduto: {
      backgroundColor: colors[theme].tableHeaderBackground,
      width: '34%',
      height: 'auto',
      textAlign: 'center',
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      paddingLeft: 8,
      borderRadius: 8,
    },
    priceRowContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceRow: {
      backgroundColor: colors[theme].tableRowBackground,
      width: '20%',
      height: 'auto',
      textAlign: 'center',
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      paddingLeft: 8,
      borderRadius: 8,
    },
    productInput: {
      width: '34%',
    },
    priceTarget: {
      color: colors[theme].targetPriceText,
    },
    buttonContainer: {
      marginTop: 12,
      marginBottom: 12,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    button: {
      marginTop: 10,
      paddingRight: 15,
      paddingLeft: 15,
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 8,
      backgroundColor: colors[theme].buttonBackground,
      alignSelf: 'center',
    },
    buttonIcon: {
      fontWeight: '700',
    },
  });

export default useStyles;
