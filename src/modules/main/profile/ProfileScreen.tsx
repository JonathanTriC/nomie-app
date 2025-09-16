import { Header, Text } from '@components';
import { FlatList, TouchableOpacity, View } from 'react-native';
import useProfileScreen from './useProfileScreen';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { Colors } from '@constants';
import { Icon } from 'react-native-paper';

const ProfileScreen: React.FC = () => {
  const { userProfile, listPreferences } = useProfileScreen();

  return (
    <View>
      <Header label="Profile" withBackIcon={false} />
      <View style={styles.mainContent}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            <FastImage
              source={{ uri: userProfile?.avatar }}
              style={styles.avatarImg}
            />
          </View>
          <Text
            text={userProfile?.fullname}
            type="bold-lg"
            color={Colors.neutral.base}
          />
          <Text
            text={userProfile?.email}
            type="regular-base"
            color={Colors.neutral.n300}
          />
        </View>

        <View style={styles.mt40}>
          <Text text="Preferences" />
          <View style={styles.preferencesContainer}>
            <FlatList
              data={listPreferences}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    key={item?.id}
                    style={styles.preferencesItem}
                    onPress={item?.onPress}
                  >
                    <Icon source={item?.icon} size={18} />
                    <Text text={item?.label} style={styles.flex1} />
                    <Icon source={'chevron-right'} size={18} />
                  </TouchableOpacity>
                );
              }}
              // eslint-disable-next-line react/no-unstable-nested-components
              ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export { ProfileScreen };
