import { Colors } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.neutral.n100,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  component: {
    flexGrow: 1,
    padding: 20,
  },
  backComponent: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  titleComponent: {
    marginTop: 80,
    gap: 14,
  },
  formComponent: {
    marginTop: 50,
    gap: 14,
  },
  btnLoginComponent: {
    marginTop: 50,
  },
  registerComponent: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
