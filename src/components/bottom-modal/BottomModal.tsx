import React, { ReactNode } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@components/text';
import { Icon } from 'react-native-paper';
import { styles } from './styles';

const { height } = Dimensions.get('screen');

interface BottomModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleComponent?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  rightComponent?: ReactNode;
  scrollable?: boolean;
  useScrollView?: boolean;
  useKeyboardAvoidingView?: boolean;
  keyboardAvoidingStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
  onScroll?: () => void;
  onPressClose?: (() => void) | null;
}

export const BottomModal = React.memo(
  ({
    isVisible,
    title,
    titleStyle,
    titleComponent,
    children,
    headerStyle,
    style,
    contentStyle,
    containerStyle,
    rightComponent,
    scrollable = true,
    useScrollView = true,
    useKeyboardAvoidingView = false,
    keyboardAvoidingStyle,
    keyboardVerticalOffset,
    onScroll,
    onPressClose,
  }: BottomModalProps) => {
    const insets = useSafeAreaInsets();

    const ContentWrapper = useScrollView
      ? useKeyboardAvoidingView
        ? ScrollView
        : KeyboardAwareScrollView
      : View;

    return (
      <View>
        <ReactNativeModal
          statusBarTranslucent
          isVisible={isVisible}
          onBackdropPress={onPressClose ?? undefined}
          style={styles.bottomModalWrapper}
        >
          <KeyboardAvoidingView
            enabled={useKeyboardAvoidingView}
            // behavior="position"
            style={keyboardAvoidingStyle}
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          >
            <View
              style={[
                styles.container,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  maxHeight:
                    Platform.OS === 'ios' ? height - insets.top : height * 0.85,
                  paddingBottom: insets.bottom === 0 ? 20 : insets.bottom,
                },
                style,
              ]}
            >
              <View style={[styles.headerRow, headerStyle]}>
                <View style={styles.titleRow}>
                  {onPressClose && (
                    <TouchableOpacity onPress={onPressClose}>
                      <Icon source={'close'} size={24} color="neutral.n700" />
                    </TouchableOpacity>
                  )}
                  {title && (
                    <Text style={[styles.title, titleStyle]} text={title} />
                  )}
                  {titleComponent && <View>{titleComponent}</View>}
                </View>

                {rightComponent && <View>{rightComponent}</View>}
              </View>
              <ContentWrapper
                style={StyleSheet.flatten([
                  styles.content,
                  containerStyle,
                  contentStyle,
                ])}
                scrollEnabled={useScrollView && scrollable}
                onScroll={onScroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View>{children}</View>
              </ContentWrapper>
            </View>
          </KeyboardAvoidingView>
        </ReactNativeModal>
      </View>
    );
  },
);
