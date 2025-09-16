import { Colors } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContent: {
    padding: 20,
    height: '100%',
    backgroundColor: Colors.white,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileContainer: {
    gap: 8,
    alignItems: 'center',
  },
  preferencesContainer: {
    marginTop: 12,
    padding: 12,
    gap: 12,
    borderRadius: 12,
    backgroundColor: Colors.neutral.n100,
  },
  preferencesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.neutral.disabled,
  },
  flex1: {
    flex: 1,
  },
  mt40: {
    marginTop: 40,
  },
});
