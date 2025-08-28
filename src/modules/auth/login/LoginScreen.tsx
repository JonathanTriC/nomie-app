import { Text } from '@components/text';
import { Colors, screenWidth } from '@constants';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadialGradient from 'react-native-radial-gradient';
import useLogin from './useLogin';
import { styles } from './styles';
import { Button, TextField } from '@components';

const LoginScreen: React.FC = () => {
  const { userEmail, popScreen, handleNavigateRegister } = useLogin();

  return (
    <View style={styles.screen}>
      <RadialGradient
        colors={[Colors.primary.base, Colors.neutral.n100]}
        stops={[0.2, 1]}
        center={[screenWidth / 2, 100]}
        radius={screenWidth * 0.8}
        style={styles.gradient}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.component}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <TouchableOpacity
            style={styles.backComponent}
            onPress={() => popScreen(2)}
          >
            <Text text="<" />
          </TouchableOpacity>

          <View style={styles.titleComponent}>
            <Text
              text="Hello there! 👋"
              type="bold-xl"
              color={Colors.neutral.base}
            />
            <Text
              text="Please enter your email & password to access your account."
              type="regular-base"
              color={Colors.neutral.n300}
            />
          </View>

          <View style={styles.formComponent}>
            <TextField
              label="Email Address"
              placeholder="Input your email here"
              value={userEmail}
              disabled={userEmail}
              onChangeText={() => {}}
            />
            <TextField
              label="Password"
              placeholder="Input your password here"
              value={''}
              onChangeText={() => {}}
              secure
            />
            <TouchableOpacity>
              <Text
                text="Forgot password?"
                type="bold-base"
                textAlign="right"
                color={Colors.primary.p600}
              />
            </TouchableOpacity>
          </View>

          <Button label="Login" style={styles.btnLoginComponent} />
        </View>

        <View style={styles.registerComponent}>
          <Text text={`Don't have an account? `} />

          <TouchableOpacity onPress={handleNavigateRegister}>
            <Text text="Sign up" type="bold-base" color={Colors.primary.p600} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { LoginScreen };
