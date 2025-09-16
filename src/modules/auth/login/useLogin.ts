import { apiGet, apiPostWithoutToken } from '@api';
import { handlerSetItem, Keys, URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@stores';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;

const useLogin = () => {
  const {
    navigateScreen,
    getRouteParams,
    popScreen,
    resetNavigate,
    navigation,
  } = useNavigate();
  const { userEmail } = getRouteParams<LoginScreenParams>();

  const setUserProfile = useUserStore(state => state.setUserProfile);

  const { control, getValues, handleSubmit, setError } = useForm<FormData>({
    defaultValues: {
      email: userEmail,
      password: '',
    },
    resolver: yupResolver(formSchema),
  });

  const { mutate: submitLogin, isPending } = useMutation<
    LoginResponse,
    ApiError
  >({
    mutationKey: ['login'],
    mutationFn: async () => {
      const { email, password } = getValues();

      const data = await apiPostWithoutToken({
        url: `${URL_PATH.auth.login}`,
        body: {
          email,
          password,
        },
      });

      return data;
    },
    onSuccess: data => {
      console.log('Login successful! Token:', data.token);
      handleNavigateHome(data?.token ?? '');
    },
    onError: data => {
      console.log('Login failed! Error:', data?.message);
      setError('password', {
        type: 'manual',
        message: data?.message?.error,
      });
    },
  });

  const { refetch: getUserProfile } = useQuery<GetProfileResponse>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const data = await apiGet({
        url: `${URL_PATH.user.get_profile}`,
      });

      return data;
    },
    enabled: false,
  });

  const handleGetUserProfile = useCallback(async () => {
    try {
      const { data: profileData, isSuccess } = await getUserProfile();
      if (isSuccess) {
        console.log('Get Profile successful!', profileData);

        setUserProfile(profileData);
      }
    } catch (err) {
      console.log('Get Profile failed!', err);
    }
  }, [getUserProfile, setUserProfile]);

  const handleNavigateHome = useCallback(
    async (token: string) => {
      if (!token) return;
      console.log({ token });
      await handlerSetItem(Keys.userToken, token);
      await handleGetUserProfile();

      resetNavigate('BottomTabBar');
    },
    [handleGetUserProfile, resetNavigate],
  );

  const handleNavigateRegister = useCallback(() => {
    navigation.setParams({ userEmail: '' });
    navigateScreen<RegisterScreenParams>('RegisterScreen', {
      userEmail: '',
      isFromOnboarding: false,
    });
  }, [navigation, navigateScreen]);

  const onSubmit = useCallback(() => {
    submitLogin();
  }, [submitLogin]);

  return {
    userEmail,
    control,
    isPending,
    submitLogin,
    popScreen,
    handleNavigateRegister,
    handleSubmit,
    onSubmit,
  };
};

export default useLogin;
