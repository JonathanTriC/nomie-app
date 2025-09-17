interface SplashScreenParams {}
interface OnboardingScreenParams {}
interface LoginScreenParams {
  userEmail: string;
}
interface RegisterScreenParams {
  userEmail: string;
  isFromOnboarding: boolean;
}

interface BottomTabBarParams {}
interface HomeScreenParams {}
interface SearchScreenParams {}
interface FavouritesScreenParams {}
interface ProfileScreenParams {}

interface MealsCategoryScreenParams {
  type: 'category' | 'area';
  query: string;
}
interface DetailMealsScreenParams {
  mealId: string;
}

type ParamList = {
  SplashScreen: SplashScreenParams;

  // MARK: Auth Modules
  OnboardingScreen: OnboardingScreenParams;
  LoginScreen: LoginScreenParams;
  RegisterScreen: RegisterScreenParams;

  // MARK: Main Modules
  BottomTabBar: BottomTabBarParams;
  HomeScreen: HomeScreenParams;
  SearchScreen: SearchScreenParams;
  FavouritesScreen: FavouritesScreenParams;
  ProfileScreen: ProfileScreenParams;

  // MARK: Main Modules
  MealsCategoryScreen: MealsCategoryScreenParams;
  DetailMealsScreen: DetailMealsScreenParams;
};
