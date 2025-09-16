import { Header, Text } from '@components';
import { TouchableOpacity, View } from 'react-native';
import useProfileScreen from './useProfileScreen';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { Colors } from '@constants';
import { Icon } from 'react-native-paper';

const ProfileScreen: React.FC = () => {
  const { userProfile, handleLogout } = useProfileScreen();

  return (
    <View>
      <Header label="Profile" withBackIcon={false} />
      <View style={styles.mainContent}>
        <View style={styles.profileContainer}>
          <FastImage
            source={{ uri: userProfile?.avatar }}
            style={styles.avatarImg}
          />
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
            <TouchableOpacity style={styles.preferencesItem}>
              <Icon source={'person'} size={18} />
              <Text text="User Profile" style={styles.flex1} />
              <Icon source={'chevron-right'} size={18} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.preferencesItem}
            >
              <Icon source={'logout'} size={18} />
              <Text text="Logout" style={styles.flex1} />
              <Icon source={'chevron-right'} size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export { ProfileScreen };
