import { Text } from '@components';
import { handlerGetAndParseJSON, handlerRemoveItem, Keys } from '@constants';
import { useNavigate } from '@hooks';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const HomeScreen: React.FC = () => {
  const { resetNavigate } = useNavigate();
  const userInfo = handlerGetAndParseJSON<GetProfileResponse>(Keys.userInfo);
  const width = useSharedValue(100);
  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View>
      <Text text="Home Screen" />
      <Text text={userInfo?.email} />

      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />

      <TouchableOpacity onPress={handlePress}>
        <Text text="animate" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await handlerRemoveItem(Keys.userToken);
          await handlerRemoveItem(Keys.userInfo);

          resetNavigate('OnboardingScreen');
        }}
      >
        <Text text="logout" />
      </TouchableOpacity>
    </View>
  );
};

export { HomeScreen };
