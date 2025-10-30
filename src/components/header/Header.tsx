import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Colors } from '@constants';
import { styles } from './styles';

type Props = {
  withBackIcon?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

const Header = ({ withBackIcon = true, label, style }: Props) => {
  const navigation: any = React.useContext(NavigationContext);

  return (
    <SafeAreaView>
      <View style={[styles.headerComponent, style]}>
        {withBackIcon ? (
          <IconButton
            icon={'chevron-left'}
            iconColor={Colors.neutral.base}
            size={30}
            onPress={() => navigation.goBack()}
          />
        ) : null}

        {label ? (
          <Text
            style={[
              styles.labelTxt,
              // eslint-disable-next-line react-native/no-inline-styles
              { paddingHorizontal: !withBackIcon ? 16 : 0 },
            ]}
            numberOfLines={2}
          >
            {label}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export { Header };
