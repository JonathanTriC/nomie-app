/* eslint-disable react-native/no-inline-styles */

import { Colors } from '@constants/colors';
import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

export type ButtonProps = {
  label?: string;
  icon?: any;
  color?: string;
  background?: string;
  action?: () => void;
  top?: number;
  iconLeft?: any;
  bottom?: number;
  borderWidth?: number;
  borderColor?: string;
  isDisabled?: boolean;
  style?: TouchableOpacityProps['style'];
  outline?: boolean;
  danger?: boolean;
  success?: boolean;
  primaryLight?: boolean;
  fontSize?: number;
  customDisabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  padding?: ViewStyle['padding'];
  margin?: ViewStyle['margin'];
  children?: React.ReactNode;
};

const Button = ({
  label,
  icon,
  color = Colors.white,
  background = Colors.primary.p600,
  action,
  top = 0,
  bottom = 0,
  isDisabled = false,
  outline = false,
  style = {},
  danger = false,
  success = false,
  primaryLight = false,
  fontSize = 16,
  borderColor = Colors.primary.base,
  borderWidth = 0,
  customDisabled = false,
  iconLeft,
  textStyle,
  testID,
  padding,
  children,
}: ButtonProps) => {
  return (
    <Pressable
      testID={testID}
      disabled={customDisabled || isDisabled}
      onPress={action}
      style={({ pressed }) => [
        styleProps(
          isDisabled,
          top,
          bottom,
          background,
          color,
          outline,
          danger,
          success,
          primaryLight,
          fontSize,
          borderColor,
          borderWidth,
          pressed,
          padding,
        ).container,
        style,
      ]}
    >
      {iconLeft && <View style={{ marginRight: 10 }}>{iconLeft}</View>}
      {icon && <Image source={icon} style={styles.icon} />}

      {children ? (
        children
      ) : (
        <Text
          allowFontScaling={false}
          style={[
            styleProps(
              isDisabled,
              top,
              bottom,
              background,
              color,
              outline,
              danger,
              success,
              primaryLight,
              fontSize,
              borderColor,
              borderWidth,
            ).text,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
  },
});

const styleProps = (
  isDisabled: boolean,
  top: number,
  bottom: number,
  background: string,
  color: string,
  outline: boolean,
  danger: boolean,
  success: boolean,
  primaryLight: boolean,
  fontSize: number,
  borderColor: string,
  borderWidth: number,
  pressed?: boolean,
  padding?: ViewStyle['padding'],
) =>
  StyleSheet.create({
    container: {
      padding: padding,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 30,
      backgroundColor: isDisabled
        ? Colors.neutral.disabled
        : outline
        ? Colors.transparent
        : danger
        ? Colors.danger.base
        : success
        ? Colors.success.base
        : primaryLight
        ? Colors.primary.p600
        : background,
      borderColor: isDisabled
        ? 'transparent'
        : outline
        ? Colors.white
        : borderColor
        ? borderColor
        : '#C2185B',
      marginTop: top,
      marginBottom: bottom,
      borderWidth: outline ? 1 : borderWidth ? borderWidth : 0,
      paddingVertical: 12,
      opacity: pressed ? 0.5 : 1,
    },
    text: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontSize,
      fontWeight: '600',
      fontFamily: 'Poppins-SemiBold',
      color: isDisabled
        ? Colors.neutral.n300
        : outline || primaryLight
        ? Colors.white
        : danger
        ? Colors.danger.base
        : success
        ? Colors.white
        : color,
    },
  });

export { Button };
