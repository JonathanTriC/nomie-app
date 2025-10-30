import { Text } from '@components/text';
import { Colors, screenWidth } from '@constants';
import { Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadialGradient from 'react-native-radial-gradient';
import { BottomModal, Button, TextField } from '@components';
import { styles } from './styles';
import useRegister from './useRegister';
import { Icon } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import SuccessRegister from '@assets/images/success-register.png';

const RegisterScreen: React.FC = () => {
  const {
    control,
    isFromOnboarding,
    usernameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    showModalSuccessRegister,
    toggleSuccessRegisterModal,
    popScreen,
    navigateScreen,
    handleSubmit,
    onSubmit,
  } = useRegister();

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
            <Controller
              control={control}
              name={'fullname'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  label="Fullname"
                  placeholder="Input your fullname here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'person'}
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => usernameRef.current?.focus()}
                />
              )}
            />

            <Controller
              control={control}
              name={'username'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  ref={usernameRef}
                  required
                  label="Username"
                  placeholder="Input your username here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'person'}
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    isFromOnboarding
                      ? passwordRef.current?.focus()
                      : emailRef.current?.focus()
                  }
                />
              )}
            />

            <Controller
              control={control}
              name={'email'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  ref={emailRef}
                  required
                  label="Email Address"
                  placeholder="Input your email here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  disabled={isFromOnboarding}
                  leftIcon={'mail'}
                  keyboardType="email-address"
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
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
                  ref={passwordRef}
                  required
                  secure
                  label="Password"
                  placeholder="Input your password here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'lock'}
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name={'confirm_password'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  ref={confirmPasswordRef}
                  required
                  secure
                  label="Confirm Password"
                  placeholder="Input your password here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'lock'}
                  errorMessage={error?.message}
                  returnKeyType="done"
                />
              )}
            />
          </View>

          <Button
            label="Sign Up"
            style={styles.btnLoginComponent}
            action={handleSubmit(onSubmit)}
          />
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

      <BottomModal isVisible={showModalSuccessRegister}>
        <View style={styles.gap20}>
          <Image
            source={SuccessRegister}
            style={styles.successRegisterImg}
            resizeMode="cover"
          />
          <View style={styles.gap12}>
            <Text
              text="Registration Successful!"
              type="bold-xl"
              textAlign="center"
            />
            <Text
              text={`Your account has been created.\nPlease login using your new credentials.`}
              type="regular-base"
              textAlign="center"
            />
          </View>
          <Button
            label="Login Now"
            action={() => {
              toggleSuccessRegisterModal();
              setTimeout(() => {
                navigateScreen<LoginScreenParams>('LoginScreen', {
                  userEmail: '',
                });
              }, 500);
            }}
          />
        </View>
      </BottomModal>
    </View>
  );
};

export { RegisterScreen };
