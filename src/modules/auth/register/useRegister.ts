import { useNavigate } from '@hooks';

const useRegister = () => {
  const { navigateScreen, popScreen, getRouteParams } = useNavigate();
  const { userEmail, isFromOnboarding } =
    getRouteParams<RegisterScreenParams>();

  return {
    userEmail,
    isFromOnboarding,
    popScreen,
    navigateScreen,
  };
};

export default useRegister;
