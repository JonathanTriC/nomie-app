import { Colors, screenWidth } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.neutral.n100,
  },
  container: {
    padding: 20,
    gap: 20,
  },
  gradient: {
    position: 'absolute',
    top: -20,
    left: 0,
    width: '100%',
    height: '100%',
  },
  cardItemContainer: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: Colors.neutral.n50,
  },
  itemImg: {
    width: 16,
    height: 16,
  },
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
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  m20: {
    margin: 20,
  },
  gap8: {
    gap: 8,
  },
  gap12: {
    gap: 12,
  },
  gap20: {
    gap: 20,
  },
  height180: {
    height: 180,
  },
  flex1: {
    flex: 1,
  },
});
