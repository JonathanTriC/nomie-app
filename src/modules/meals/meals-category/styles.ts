import { Colors, screenWidth } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchCard: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  searchImg: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  favoriteIcon: {
    padding: 6,
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: Colors.neutral.n50,
  },
  emptyStateComponent: {
    padding: 18,
    gap: 12,
    borderRadius: 18,
    backgroundColor: Colors.white,
  },
  emptyStateImg: {
    width: screenWidth - 76,
    height: 300,
    borderRadius: 20,
  },
  gap12: {
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
});
