import { createStackNavigator } from '@react-navigation/stack';
import { useNavigator } from './useNavigator';
import { SplashScreen } from '@modules/common';
import { LoginScreen } from '@modules/auth';

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
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
    </Stack.Navigator>
  );
};
