interface SplashScreenParams {}
interface OnboardingScreenParams {}
interface LoginScreenParams {
  userEmail: string;
}
interface RegisterScreenParams {
  userEmail: string;
  isFromOnboarding: boolean;
}

type ParamList = {
  SplashScreen: SplashScreenParams;
  OnboardingScreen: OnboardingScreenParams;
  LoginScreen: LoginScreenParams;
  RegisterScreen: RegisterScreenParams;
};
