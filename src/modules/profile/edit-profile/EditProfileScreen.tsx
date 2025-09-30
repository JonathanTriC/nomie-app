import { Button, Header, TextField } from '@components';
import { View } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import useEditProfileScreen from './useEditProfileScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';

const EditProfileScreen: React.FC = () => {
  const {
    userProfile,
    control,
    usernameRef,
    emailRef,
    handleSubmit,
    onSubmit,
  } = useEditProfileScreen();

  return (
    <View style={styles.container}>
      <Header label="Edit Profile" />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.component}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <FastImage
                source={{ uri: userProfile?.avatar }}
                style={styles.avatarImg}
              />
            </View>
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
                  onSubmitEditing={() => emailRef.current?.focus()}
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
                  disabled
                  label="Email Address"
                  placeholder="Input your email here"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon={'mail'}
                  keyboardType="email-address"
                  errorMessage={error?.message}
                  returnKeyType="done"
                />
              )}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.btnContainer}>
        <Button label="Update Profile" action={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export { EditProfileScreen };
