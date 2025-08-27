interface SplashScreenParams {}
interface OnboardingScreenParams {}
interface LoginScreenParams {
  email: string;
}
interface RegisterScreenParams {
  email: string;
}

type ParamList = {
  SplashScreen: SplashScreenParams;
  OnboardingScreen: OnboardingScreenParams;
  LoginScreen: LoginScreenParams;
  RegisterScreen: RegisterScreenParams;
};
