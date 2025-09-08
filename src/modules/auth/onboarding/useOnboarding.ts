import { apiPostWithoutToken } from '@api';
import { URL_PATH } from '@constants';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email to continue'),
});

type FormData = yup.InferType<typeof formSchema>;

const useOnboarding = () => {
  const { navigateScreen } = useNavigate();
  const { control, handleSubmit, setValue, setError } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(formSchema),
  });

  const email = useWatch({ control, name: 'email' });

  const { mutate: submitCheckEmail, isPending } =
    useMutation<CheckEmailResponse>({
      mutationKey: ['check-email'],
      mutationFn: async () => {
        const data = await apiPostWithoutToken({
          url: `${URL_PATH.auth_check_email}`,
          body: {
            email: email,
          },
          tags: 'check-email',
        });
        console.log('data from mutation:', data);

        return data;
      },
      onSuccess: data => {
        console.log('Check email successful! Isregistered:', data.isRegistered);
        const isRegistered = data.isRegistered;

        if (isRegistered) {
          navigateScreen<LoginScreenParams>('LoginScreen', {
            userEmail: email,
          });
        } else {
          navigateScreen<RegisterScreenParams>('RegisterScreen', {
            userEmail: email,
            isFromOnboarding: true,
          });
        }
        setValue('email', '');
      },
      onError: data => {
        console.log('Check email failed! Error:', data?.message);
        setError('email', {
          type: 'manual',
          message: data?.message ?? 'Something went wrong!',
        });
      },
    });

  const onSubmit = useCallback(() => {
    if (!email) return;

    submitCheckEmail();
  }, [email, submitCheckEmail]);

  return {
    email,
    isPending,
    control,
    handleSubmit,
    onSubmit,
  };
};

export default useOnboarding;
