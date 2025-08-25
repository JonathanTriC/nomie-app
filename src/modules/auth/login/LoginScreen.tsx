import { apiPostWithoutToken } from '@api/apiWrapping';
import { URL_PATH } from '@constants/url';
import { useMutation } from '@tanstack/react-query';
import { Text, TouchableOpacity, View } from 'react-native';

const LoginScreen: React.FC = () => {
  const submitLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const data = await apiPostWithoutToken({
        url: `${URL_PATH.auth_login}`,
        body: {
          email: '',
          password: '',
        },
        tags: 'login',
      });
      console.log('data from mutation:', data);

      return data;
    },
    onSuccess: data => {
      console.log('Login successful! Token:', data.token);
    },
    onError: data => {
      console.log('Login failed! Error:', data?.message);
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={() => submitLogin.mutate()}>
        <Text>{submitLogin.isPending ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export { LoginScreen };
