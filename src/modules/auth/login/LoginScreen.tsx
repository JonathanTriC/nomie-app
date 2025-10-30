import { Text } from '@components/text';
import { Colors, screenWidth } from '@constants';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadialGradient from 'react-native-radial-gradient';
import useLogin from './useLogin';
import { styles } from './styles';
import { Button, TextField } from '@components';
import { Icon } from 'react-native-paper';
import { Controller } from 'react-hook-form';

const LoginScreen: React.FC = () => {
  const {
    userEmail,
    control,
    isPending,
    popScreen,
    handleNavigateRegister,
    handleSubmit,
    onSubmit,
  } = useLogin();

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
            <Icon source={'arrow-back'} size={16} />
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
            <Controller
              control={control}
              name={'email'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  disabled={userEmail}
                  leftIcon={'mail'}
                  label="Email Address"
                  placeholder="Input your email here"
                  returnKeyType="done"
                  keyboardType="email-address"
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'password'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  secure
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'lock'}
                  label="Password"
                  placeholder="Input your password here"
                  returnKeyType="done"
                  keyboardType="email-address"
                  errorMessage={error?.message}
                />
              )}
            />

            {/* <TouchableOpacity>
              <Text
                text="Forgot password?"
                type="bold-base"
                textAlign="right"
                color={Colors.primary.p600}
              />
            </TouchableOpacity> */}
          </View>

          <Button
            label="Login"
            style={styles.btnLoginComponent}
            action={handleSubmit(onSubmit)}
          >
            {isPending && <ActivityIndicator color={Colors.white} />}
          </Button>
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
