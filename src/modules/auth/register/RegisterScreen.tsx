import { Text } from '@components/text';
import { useNavigate } from '@hooks';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen: React.FC = () => {
  const { getRouteParams } = useNavigate();
  const { email } = getRouteParams<RegisterScreenParams>();

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Text text={`Register as: ${email}`} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export { RegisterScreen };
