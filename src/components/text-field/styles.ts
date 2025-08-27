import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  errorHelperText: {
    marginTop: 4,
    color: Colors.danger.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
  },
  successHelperText: {
    marginTop: 4,
    color: Colors.success.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
  },
  subLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
    fontSize: 12,
    marginTop: 8,
  },
});
