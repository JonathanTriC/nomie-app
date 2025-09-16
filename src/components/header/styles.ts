import { Colors, screenWidth } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerComponent: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTxt: {
    color: Colors.neutral.base,
    fontSize: 16,
    fontWeight: '600',
    width: screenWidth - 80,
  },
});
