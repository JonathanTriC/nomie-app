import { apiPost } from '@api';
import {
  handlerSetItem,
  Keys,
  showErrorToast,
  showSuccessToast,
  URL_PATH,
} from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@hooks';
import { useUserStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  fullname: yup.string().required('Please enter your fullname'),
  username: yup.string().required('Please enter your username'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
});

type FormData = yup.InferType<typeof formSchema>;

const useEditProfileScreen = () => {
  const { popScreen } = useNavigate();
  const userProfile = useUserStore(state => state.userProfile);
  const setUserProfile = useUserStore(state => state.setUserProfile);

  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const { control, getValues, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullname: userProfile?.fullname ?? '',
      username: userProfile?.username ?? '',
      email: userProfile?.email ?? '',
    },
    resolver: yupResolver(formSchema),
  });

  const { mutate: submitUpdateProfile } = useMutation<
    UpdateProfileResponse,
    ApiError
  >({
    mutationKey: ['update-profile'],
    mutationFn: async () => {
      const { fullname, username } = getValues();

      const body = {
        fullname,
        username,
        avatar: userProfile?.avatar ?? '',
      };
      console.log('🚀 ~ useEditProfileScreen ~ body:', body);

      const data = await apiPost({
        url: `${URL_PATH.user.update_profile}`,
        body,
      });

      return data;
    },
    onSuccess: async data => {
      console.log('Update Profile successful! Token:', data);
      const updatedUser: GetProfileResponse = {
        user_id: data?.user?.user_id,
        avatar: data?.user?.avatar,
        fullname: data?.user?.fullname,
        username: data?.user?.username,
        email: data?.user?.email,
      };
      await setUserProfile(updatedUser);
      await handlerSetItem(Keys.userToken, data?.user?.token);
      showSuccessToast(data?.message);
      popScreen();
    },
    onError: data => {
      console.log('Update Profile failed! Error:', data?.message);
      showErrorToast(data?.message?.error);
    },
  });

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitUpdateProfile();
  }, [submitUpdateProfile]);

  return {
    userProfile,
    control,
    usernameRef,
    emailRef,
    handleSubmit,
    onSubmit,
  };
};

export default useEditProfileScreen;
