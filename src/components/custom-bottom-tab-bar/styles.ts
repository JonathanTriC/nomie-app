import { Colors } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral.n50,
    width: '90%',
    alignSelf: 'center',
    bottom: 30,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  text: {
    marginLeft: 8,
    color: Colors.neutral.n50,
    fontWeight: '400',
    fontFamily: 'Jost-Regular',
  },
});
