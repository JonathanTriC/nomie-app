import { Button, Header, TextField } from '@components';
import { View } from 'react-native';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadialGradient from 'react-native-radial-gradient';
import { Colors, screenWidth } from '@constants';
import useChangePasswordScreen from './useChangePasswordScreen';
import { Controller } from 'react-hook-form';

const ChangePasswordScreen: React.FC = () => {
  const {
    control,
    newPasswordRef,
    confirmNewPasswordRef,
    handleSubmit,
    onSubmit,
  } = useChangePasswordScreen();

  return (
    <View style={styles.container}>
      <RadialGradient
        colors={[Colors.primary.base, Colors.neutral.n100]}
        stops={[0.2, 1]}
        center={[screenWidth / 2, 100]}
        radius={screenWidth * 0.8}
        style={styles.gradient}
      />

      <Header
        label="Change Password"
        style={{ backgroundColor: Colors.transparent }}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.component}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={styles.formComponent}>
            <Controller
              control={control}
              name={'old_password'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  secure
                  label="Old Password"
                  placeholder="Input your old password here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'lock'}
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => newPasswordRef.current?.focus()}
                />
              )}
            />

            <Controller
              control={control}
              name={'new_password'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  secure
                  label="New Password"
                  placeholder="Input your new password here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'lock'}
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmNewPasswordRef.current?.focus()}
                />
              )}
            />

            <Controller
              control={control}
              name={'confirm_new_password'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  secure
                  label="Confirm New Password"
                  placeholder="Confirm your new password here"
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
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.btnContainer}>
        <Button label="Update Password" action={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export { ChangePasswordScreen };
