import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import { Text, TextField, Button } from '@components';
import useOnboarding from './useOnboarding';
import { Controller } from 'react-hook-form';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '@constants';

const OnBoardingScreen: React.FC = () => {
  const { email, isPending, control, handleSubmit, onSubmit } = useOnboarding();

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <FastImage
        source={require('@assets/images/onboarding-bg.png')}
        style={styles.authBG}
        resizeMode="cover"
      />

      <View style={styles.mainContent}>
        <View style={styles.gap6}>
          <Text text="Welcome To Nomie" type="bold-2xl" />
          <Text text="Your Nom Nom Bestie!" type="regular-base" />
        </View>
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
              label="Input your email to continue login/register"
              placeholder="Input your email here"
              returnKeyType="done"
              keyboardType="email-address"
              errorMessage={error?.message}
            />
          )}
        />
        <Button
          isDisabled={!email || isPending}
          label="Continue"
          action={handleSubmit(onSubmit)}
        >
          {isPending && <ActivityIndicator color={Colors.white} />}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export { OnBoardingScreen };
