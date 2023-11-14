import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { get } from '../../utils/storage';

const theme = await get('Theme');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
  },
});

export default styles;
