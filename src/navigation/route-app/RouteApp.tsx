import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Navigator } from '@navigation/navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const RouteApp = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar barStyle={'dark-content'} />

          <GestureHandlerRootView style={styles.flex1}>
            <PaperProvider
              settings={{
                icon: props => <MaterialIcons {...props} />,
              }}
            >
              <NavigationContainer theme={MyTheme}>
                <Navigator />
              </NavigationContainer>
            </PaperProvider>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
