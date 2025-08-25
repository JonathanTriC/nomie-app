import { useNavigate } from '@hooks/navigation-hooks';
import { useCallback, useEffect } from 'react';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();

  const checkIsUserLoggedIn = useCallback(() => {
    // let user = firebase.auth().currentUser?.uid;
    // if (user) {
    //   navigation.reset({index: 0, routes: [{name: 'BottomTabNavigator'}]});
    // } else {
    //   navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
    // }
    setTimeout(() => {
      resetNavigate('LoginScreen');
    }, 1000);
  }, [resetNavigate]);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [checkIsUserLoggedIn]);

  return {};
};

export { useSplashScreen };
