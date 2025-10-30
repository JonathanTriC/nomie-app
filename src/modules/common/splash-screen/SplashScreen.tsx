import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSplashScreen } from './useSplashScreen';

const Logo = require('@assets/images/logo.png');

const SplashScreen: React.FC = () => {
  const {} = useSplashScreen();
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCCA8',
  },
  logo: {
    width: 256,
    height: 256,
  },
});

export { SplashScreen };
