import { apiPost } from '@api';
import { showErrorToast, showSuccessToast, URL_PATH } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@hooks';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, TextInput } from 'react-native';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  old_password: yup.string().required('Please enter your old password'),
  new_password: yup.string().required('Please enter your new password'),
  confirm_new_password: yup
    .string()
    .oneOf(
      [yup.ref('new_password')],
      "New Password and Confirm New Password doesn't match",
    )
    .required('Please confirm your new password'),
});

type FormData = yup.InferType<typeof formSchema>;

const useChangePasswordScreen = () => {
  const { popScreen } = useNavigate();

  const { control, getValues, handleSubmit } = useForm<FormData>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    resolver: yupResolver(formSchema),
  });

  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);

  const { mutate: submitChangePassword } = useMutation<
    ChangePasswordResponse,
    ApiError
  >({
    mutationKey: ['change-password'],
    mutationFn: async () => {
      const { old_password, confirm_new_password } = getValues();

      const body = {
        current_password: old_password,
        new_password: confirm_new_password,
      };

      const data = await apiPost({
        url: `${URL_PATH.user.change_password}`,
        body,
      });

      return data;
    },
    onSuccess: async data => {
      showSuccessToast(data?.message);
      popScreen();
    },
    onError: data => {
      console.log('Change Password failed! Error:', data?.message);
      showErrorToast(data?.message?.error);
    },
  });

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitChangePassword();
    console.log('submit');
  }, [submitChangePassword]);

  return {
    control,
    newPasswordRef,
    confirmNewPasswordRef,
    handleSubmit,
    onSubmit,
  };
};

export default useChangePasswordScreen;
