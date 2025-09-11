import { Text } from '@components';
import { handlerRemoveItem, Keys } from '@constants';
import { useNavigate } from '@hooks';
import { useUserStore } from '@stores';
import { TouchableOpacity, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  const { resetNavigate } = useNavigate();
  const clearUserProfile = useUserStore(state => state.clearUserProfile);

  return (
    <View>
      <Text text="ProfileScreen" />

      <TouchableOpacity
        onPress={async () => {
          await handlerRemoveItem(Keys.userToken);
          clearUserProfile();
          resetNavigate('OnboardingScreen');
        }}
      >
        <Text text="logout" />
      </TouchableOpacity>
    </View>
  );
};

export { ProfileScreen };
