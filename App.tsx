/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RouteApp } from '@navigation/route-app';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return <RouteApp />;
}

export default App;
