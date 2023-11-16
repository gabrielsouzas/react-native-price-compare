import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { get } from '../../utils/storage';

// const theme = await get('Theme') || 'light';

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].background,
    },
  });

/*const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].background,
    },
  });*/

export default useStyles;
