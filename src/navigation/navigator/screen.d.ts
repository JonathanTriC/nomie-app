interface SplashScreenParams {}
interface OnboardingScreenParams {}
interface LoginScreenParams {
  userEmail: string;
}
interface RegisterScreenParams {
  userEmail: string;
  isFromOnboarding: boolean;
}

interface HomeScreenParams {}

type ParamList = {
  SplashScreen: SplashScreenParams;

  // MARK: Auth Modules
  OnboardingScreen: OnboardingScreenParams;
  LoginScreen: LoginScreenParams;
  RegisterScreen: RegisterScreenParams;

  // MARK: Main Modules
  HomeScreen: HomeScreenParams;
};
