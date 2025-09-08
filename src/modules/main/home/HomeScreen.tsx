import { Text } from '@components';
import { handlerGetAndParseJSON, handlerRemoveItem, Keys } from '@constants';
import { useNavigate } from '@hooks';
import { TouchableOpacity, View } from 'react-native';

const HomeScreen: React.FC = () => {
  const { resetNavigate } = useNavigate();
  const userInfo = handlerGetAndParseJSON<GetProfileResponse>(Keys.userInfo);

  return (
    <View>
      <Text text="Home Screen" />
      <Text text={userInfo?.email} />

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
