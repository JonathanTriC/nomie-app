import { apiPost } from '@api';
import {
  handlerGetItem,
  handlerRemoveItem,
  handlerSetItem,
  Keys,
  URL_PATH,
} from '@constants';
import { useNavigate } from '@hooks/navigation-hooks';
import { useUserStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();

  const clearUserProfile = useUserStore(state => state.clearUserProfile);
  const userToken = handlerGetItem(Keys.userToken);

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
      const token = data?.access_token ?? '';
      checkIsUserLoggedIn(token);
    },
  });

  const checkIsUserLoggedIn = useCallback(
    async (token: string) => {
      await handlerSetItem(Keys.userToken, token);
      if (token) {
        setTimeout(() => {
          resetNavigate('BottomTabBar');
        }, 1000);
      } else {
        await handlerRemoveItem(Keys.userToken);
        clearUserProfile();
        setTimeout(() => {
          resetNavigate('OnboardingScreen');
        }, 1000);
      }
    },
    [resetNavigate, clearUserProfile],
  );

  useEffect(() => {
    submitRefreshToken();
  }, [submitRefreshToken]);

  return {};
};

export { useSplashScreen };
