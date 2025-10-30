import { Colors, screenWidth } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.neutral.n50,
  },
  favoriteCard: {
    width: screenWidth * 0.5 - 30,
    padding: 12,
    gap: 12,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  favoriteContainer: {
    gap: 20,
    paddingBottom: 140,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
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
  img: {
    width: screenWidth * 0.5 - 54,
    height: 100,
    borderRadius: 12,
  },
  gap20: {
    gap: 20,
  },
});
