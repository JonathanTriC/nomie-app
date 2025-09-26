import { Colors } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.n50,
  },
  component: {
    padding: 20,
    paddingBottom: 100,
  },
  formComponent: {
    gap: 14,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
