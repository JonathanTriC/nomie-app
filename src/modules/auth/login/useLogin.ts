import { apiPostWithoutToken } from '@api';
import { URL_PATH } from '@constants';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
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

  return { submitLogin };
};

export default useLogin;
