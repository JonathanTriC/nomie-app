import { Colors, screenWidth } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: Colors.neutral.n50,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleContainer: {
    flex: 1,
    width: screenWidth * 0.7,
  },
  todayRecommendationCards: {
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  todayRecommendationImg: {
    marginBottom: 12,
    width: screenWidth - 64,
    height: 200,
    borderRadius: 12,
  },
  todayRecommendationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealCards: {
    padding: 12,
    borderRadius: 12,
    width: 154,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  mealImg: {
    marginBottom: 12,
    width: 130,
    height: 100,
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
  favoriteIconPosition: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  horizontalSkeleton: {
    flexDirection: 'row',
    gap: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gap6: {
    gap: 6,
  },
  gap8: {
    gap: 8,
  },
  gap12: {
    gap: 12,
  },
  height50: {
    height: 50,
  },
});
