import { createStackNavigator } from '@react-navigation/stack';
import { useNavigator } from './useNavigator';
import {
  HomeScreen,
  LoginScreen,
  OnBoardingScreen,
  RegisterScreen,
  SplashScreen,
} from '@modules';

const Stack = createStackNavigator<ParamList>();
type NavigatorProps = {};

export const Navigator: React.FC<NavigatorProps> = () => {
  const { screenListeners } = useNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenListeners={screenListeners}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'SplashScreen'} component={SplashScreen} />

      {/* //MARK: Auth Modules */}
      <Stack.Screen name={'OnboardingScreen'} component={OnBoardingScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />

      {/* //MARK: Main Modules */}
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
    </Stack.Navigator>
  );
};
