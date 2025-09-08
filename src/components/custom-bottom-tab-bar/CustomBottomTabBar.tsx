import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { Icon } from 'react-native-paper';
import { Colors } from '@constants';
import { styles } from './styles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getIconByRouteName = (routeName: string, color: string) => {
    switch (routeName?.toLowerCase()) {
      case 'home':
        return <Icon source={'home'} size={18} color={color} />;
      case 'search':
        return <Icon source={'explore'} size={18} color={color} />;
      case 'favourites':
        return <Icon source={'favorite'} size={18} color={color} />;
      case 'profile':
        return <Icon source={'person'} size={18} color={color} />;
      default:
        return <Icon source={'home'} size={18} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: isFocused
                  ? Colors.primary.p600
                  : 'transparent',
              },
            ]}
          >
            {getIconByRouteName(
              route.name,
              isFocused ? Colors.neutral.n50 : Colors.primary.p600,
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

export { CustomBottomTabBar };
