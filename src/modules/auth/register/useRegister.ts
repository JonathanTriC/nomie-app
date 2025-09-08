import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { apiPostWithoutToken } from '@api';
import { URL_PATH } from '@constants';

const formSchema = yup.object().shape({
  fullname: yup.string().required('Please enter your fullname'),
  username: yup.string().required('Please enter your username'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], "Password and Confirm Password doesn't match")
    .required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;
type FormType =
  | 'fullname'
  | 'username'
  | 'email'
  | 'password'
  | 'confirm_password';

const useRegister = () => {
  const { navigateScreen, popScreen, getRouteParams } = useNavigate();
  const { userEmail, isFromOnboarding } =
    getRouteParams<RegisterScreenParams>();

  const [showModalSuccessRegister, setShowSuccessModalRegister] =
    useState<boolean>(false);

  const { control, getValues, setError, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullname: '',
      username: '',
      email: userEmail ?? '',
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(formSchema),
  });

  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate: submitRegister } = useMutation<RegisterResponse, ApiError>({
    mutationKey: ['register'],
    mutationFn: async () => {
      const { fullname, username, email, password } = getValues();

      const formData = new FormData();
      formData.append('avatar', undefined);
      formData.append('fullname', fullname?.trim());
      formData.append('username', username?.trim());
      formData.append('email', email?.trim());
      formData.append('password', password?.trim());

      const data = await apiPostWithoutToken({
        url: `${URL_PATH.auth_register}`,
        body: formData,
      });

      return data;
    },
    onSuccess: data => {
      console.log('Register successful! Token:', data);
      toggleSuccessRegisterModal();
    },
    onError: data => {
      console.log('Register failed! Error:', data?.message);
      setError(data?.message?.form_key as FormType, {
        type: 'manual',
        message: data?.message?.error,
      });
    },
  });

  const toggleSuccessRegisterModal = useCallback(
    () => setShowSuccessModalRegister(prevState => !prevState),
    [],
  );

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitRegister();
  }, [submitRegister]);

  return {
    userEmail,
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
  };
};

export default useRegister;
