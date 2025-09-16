import { apiGet, apiPost } from '@api';
import {
  handlerGetItem,
  handlerRemoveItem,
  handlerSetItem,
  Keys,
  URL_PATH,
} from '@constants';
import { useNavigate } from '@hooks/navigation-hooks';
import { useUserStore } from '@stores';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();

  const setUserProfile = useUserStore(state => state.setUserProfile);
  const clearUserProfile = useUserStore(state => state.clearUserProfile);
  const userToken = handlerGetItem(Keys.userToken);

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

  const { mutate: submitRefreshToken } = useMutation<
    RefreshTokenResponse,
    ApiError
  >({
    mutationKey: ['refresh-token'],
    mutationFn: async () => {
      const data = await apiPost({
        url: `${URL_PATH.auth.refresh_token}`,
        body: {
          refresh_token: userToken ?? '',
        },
      });

      return data;
    },
    onSettled: async data => {
      console.log('Refresh Token on settled:', data);
      const token = data?.token ?? '';
      checkIsUserLoggedIn(token);
    },
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

  const checkIsUserLoggedIn = useCallback(
    async (token: string) => {
      await handlerSetItem(Keys.userToken, token);
      if (token) {
        handleGetUserProfile().then(() => {
          setTimeout(() => {
            resetNavigate('BottomTabBar');
          }, 1000);
        });
      } else {
        await handlerRemoveItem(Keys.userToken);
        clearUserProfile();
        setTimeout(() => {
          resetNavigate('OnboardingScreen');
        }, 1000);
      }
    },
    [resetNavigate, clearUserProfile, handleGetUserProfile],
  );

  useEffect(() => {
    submitRefreshToken();
  }, [submitRefreshToken]);

  return {};
};

export { useSplashScreen };
