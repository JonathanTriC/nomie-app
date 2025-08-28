import { apiPostWithoutToken } from '@api';
import { URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

const useLogin = () => {
  const { navigateScreen, getRouteParams, popScreen, navigation } =
    useNavigate();
  const { userEmail } = getRouteParams<LoginScreenParams>();

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

  const handleNavigateRegister = useCallback(() => {
    navigation.setParams({ userEmail: '' });
    navigateScreen<RegisterScreenParams>('RegisterScreen', {
      userEmail: '',
      isFromOnboarding: false,
    });
  }, [navigation, navigateScreen]);

  return {
    userEmail,
    submitLogin,
    popScreen,
    handleNavigateRegister,
  };
};

export default useLogin;
