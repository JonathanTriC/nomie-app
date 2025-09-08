import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home';
import { SearchScreen } from '../search';
import { ProfileScreen } from '../profile';
import { FavouritesScreen } from '../favourites';
import { CustomBottomTabBar } from '@components';

const BottomTabBar: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomBottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export { BottomTabBar };
