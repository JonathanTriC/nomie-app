import { Text } from '@components/text';
import { Colors, screenWidth } from '@constants';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadialGradient from 'react-native-radial-gradient';
import { Button, TextField } from '@components';
import { styles } from './styles';
import useRegister from './useRegister';

const RegisterScreen: React.FC = () => {
  const { userEmail, isFromOnboarding, popScreen, navigateScreen } =
    useRegister();

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
            onPress={() => popScreen()}
          >
            <Text text="<" />
          </TouchableOpacity>

          <View style={styles.titleComponent}>
            <Text
              text="Welcome aboard! 👋"
              type="bold-xl"
              color={Colors.neutral.base}
            />
            <Text
              text="Let's create your account so you can get started."
              type="regular-base"
              color={Colors.neutral.n300}
            />
          </View>

          <View style={styles.formComponent}>
            <TextField
              label="Fullname"
              placeholder="Input your fullname here"
              value={''}
              onChangeText={() => {}}
            />
            <TextField
              label="Username"
              placeholder="Input your username here"
              value={''}
              onChangeText={() => {}}
            />
            <TextField
              label="Email Address"
              placeholder="Input your email here"
              value={userEmail}
              disabled={isFromOnboarding}
              onChangeText={() => {}}
            />
            <TextField
              label="Password"
              placeholder="Input your password here"
              value={''}
              onChangeText={() => {}}
              secure
            />
            <TextField
              label="Confirm Password"
              placeholder="Input your password here"
              value={''}
              onChangeText={() => {}}
              secure
            />
          </View>

          <Button label="Sign Up" style={styles.btnLoginComponent} />
        </View>

        <View style={styles.loginComponent}>
          <Text text={`Already have an account? `} />

          <TouchableOpacity
            onPress={() =>
              navigateScreen<LoginScreenParams>('LoginScreen', {
                userEmail: '',
              })
            }
          >
            <Text text="Login" type="bold-base" color={Colors.primary.p600} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { RegisterScreen };
