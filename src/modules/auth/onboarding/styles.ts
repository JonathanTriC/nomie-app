import { Colors } from '@constants/colors';
import { screenHeight, screenWidth } from '@constants/functional';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  authBG: {
    marginTop: -160,
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  mainContent: {
    flex: 1,
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '100%',
    gap: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: Colors.white,
  },
  gap6: { gap: 6 },
});
