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
  avatarContainer: {
    alignItems: 'center',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: Colors.primary.base,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  formComponent: {
    marginTop: 50,
    gap: 14,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
});
