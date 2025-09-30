import { apiPost } from '@api';
import { handlerRemoveItem, Keys, URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useUserStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const useProfileScreen = () => {
  const { resetNavigate, navigateScreen } = useNavigate();
  const userProfile = useUserStore(state => state.userProfile);
  const clearUserProfile = useUserStore(state => state.clearUserProfile);

  const [isShowModalDeleteAccount, setShowDeleteModalAccount] =
    useState<boolean>(false);

  const toggleDeleteAccountModal = useCallback(
    () => setShowDeleteModalAccount(prevState => !prevState),
    [],
  );

  const listPreferences = [
    {
      id: 1,
      icon: 'person',
      label: 'Edit Profile',
      onPress: () => navigateScreen('EditProfileScreen'),
    },
    {
      id: 2,
      icon: 'lock',
      label: 'Change Password',
      onPress: () => navigateScreen('ChangePasswordScreen'),
    },
    {
      id: 3,
      icon: 'person-off',
      label: 'Delete Account',
      onPress: toggleDeleteAccountModal,
    },
    {
      id: 4,
      icon: 'logout',
      label: 'Logout',
      onPress: () => handleLogout(),
    },
  ];

  const { mutate: submitDeleteAccount } = useMutation({
    mutationKey: ['delete-account'],
    mutationFn: async () => {
      const data = await apiPost({
        url: `${URL_PATH.user.delete_account}`,
      });

      return data;
    },
    onSuccess: data => {
      console.log('Delete Account successful! Token:', data.token);
      onDeleteAccount();
    },
    onError: data => {
      console.log('Delete Account failed! Error:', data?.message);
    },
  });

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
      console.log('Logout failed! Error:', data?.message);
    },
  });

  const onDeleteAccount = useCallback(async () => {
    await handlerRemoveItem(Keys.userToken);
    clearUserProfile();
    toggleDeleteAccountModal();
    setTimeout(() => {
      resetNavigate('OnboardingScreen');
    }, 500);
  }, [clearUserProfile, resetNavigate, toggleDeleteAccountModal]);

  const onLogout = useCallback(async () => {
    await handlerRemoveItem(Keys.userToken);
    clearUserProfile();
    resetNavigate('OnboardingScreen');
  }, [clearUserProfile, resetNavigate]);

  const handleDeleteAccount = useCallback(() => {
    submitDeleteAccount();
  }, [submitDeleteAccount]);

  const handleLogout = useCallback(() => {
    submitLogout();
  }, [submitLogout]);

  return {
    userProfile,
    listPreferences,
    isShowModalDeleteAccount,
    toggleDeleteAccountModal,
    handleDeleteAccount,
  };
};

export default useProfileScreen;
