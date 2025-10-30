import { Header, Text } from '@components';
import { FlatList, TouchableOpacity, View } from 'react-native';
import useFavouriteScreen from './useFavouriteScreen';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { Icon } from 'react-native-paper';
import { Colors } from '@constants';
import EmptyState from '@assets/images/empty-state.png';
import { Image } from 'react-native';

const FavouritesScreen: React.FC = () => {
  const { dataFavorite, goToDetailScreen } = useFavouriteScreen();

  const renderItem = (item: FavoriteMealsItem) => {
    return (
      <TouchableOpacity
        key={item?.mealId}
        style={styles.favoriteCard}
        onPress={() => goToDetailScreen(item?.mealId)}
      >
        <View>
          <FastImage
            source={{ uri: item?.mealThumbImage }}
            style={styles.img}
            resizeMode="cover"
          />
          <View style={styles.favoriteIcon}>
            <Icon source={'favorite'} size={18} color={Colors.danger.base} />
          </View>
        </View>
        <Text text={item?.mealName} type="bold-base" />
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyStateComponent}>
        <Image
          source={EmptyState}
          style={styles.emptyStateImg}
          resizeMode="cover"
        />
        <Text text="No Nom Noms Saved 🍽️!" type="bold-xl" textAlign="center" />
        <Text
          text="You haven’t saved any favorites yet — tap the heart on meals you love and they’ll show up here!"
          type="regular-base"
          textAlign="center"
        />
      </View>
    );
  };

  return (
    <View>
      <Header label="Your Favorite" withBackIcon={false} />

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataFavorite?.favourites}
          numColumns={2}
          columnWrapperStyle={styles.gap20}
          contentContainerStyle={styles.favoriteContainer}
          renderItem={({ item }) => renderItem(item)}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </View>
  );
};

export { FavouritesScreen };
