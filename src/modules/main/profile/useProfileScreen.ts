import { apiPost } from '@api';
import { handlerRemoveItem, Keys, URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useUserStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

const useProfileScreen = () => {
  const { resetNavigate } = useNavigate();
  const userProfile = useUserStore(state => state.userProfile);
  const clearUserProfile = useUserStore(state => state.clearUserProfile);

  const { mutate: submitLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const data = await apiPost({
        url: `${URL_PATH.auth.logout}`,
      });

      return data;
    },
    onSuccess: data => {
      console.log('Logout successful! Token:', data.token);
      onLogout();
    },
    onError: data => {
      console.log('Login failed! Error:', data?.message);
    },
  });

  const onLogout = useCallback(async () => {
    await handlerRemoveItem(Keys.userToken);
    clearUserProfile();
    resetNavigate('OnboardingScreen');
  }, [clearUserProfile, resetNavigate]);

  const handleLogout = useCallback(() => {
    submitLogout();
  }, [submitLogout]);

  return {
    userProfile,
    handleLogout,
  };
};

export default useProfileScreen;
