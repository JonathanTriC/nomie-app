import { Header, SkeletonLoading, Text } from '@components';
import { FlatList, Image, View } from 'react-native';
import useMealsCategory from './useMealsCategory';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { Icon } from 'react-native-paper';
import { screenWidth } from '@constants';
import EmptyState from '@assets/images/empty-state.png';

const MealsCategoryScreen: React.FC = () => {
  const { query, data, isLoading, isFetchingNextPage, loadNextPageData } =
    useMealsCategory();

  const renderSearchItem = (item: PopularPicksItem) => {
    return (
      <View key={item?.mealId} style={styles.searchCard}>
        <FastImage
          source={{ uri: item?.mealThumbImage }}
          style={styles.searchImg}
          resizeMode="cover"
        />
        <Text
          text={item?.mealName}
          type="bold-base"
          numberOfLines={1}
          style={styles.flex1}
        />
        <View style={styles.favoriteIcon}>
          <Icon source={'favorite-border'} size={18} />
        </View>
      </View>
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
        <Text text="No Meals Found 🍳" type="bold-xl" textAlign="center" />
        <Text
          text="Looks like we couldn’t find that dish. Let’s tweak your search or explore by category."
          type="regular-base"
          textAlign="center"
        />
      </View>
    );
  };

  const renderLoadingSearch = () => {
    return (
      <View style={styles.gap12}>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonLoading
            key={index}
            height={74}
            width={screenWidth - 40}
            borderRadius={12}
          />
        ))}
      </View>
    );
  };

  return (
    <View>
      <Header label={query} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={[
          styles.gap12,
          // eslint-disable-next-line react-native/no-inline-styles
          { paddingBottom: 100, paddingHorizontal: 20 },
        ]}
        renderItem={({ item }) => renderSearchItem(item)}
        keyExtractor={item => item.mealId}
        ListEmptyComponent={() =>
          isLoading ? renderLoadingSearch() : renderEmpty()
        }
        onEndReached={loadNextPageData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? renderLoadingSearch() : null}
      />
    </View>
  );
};

export { MealsCategoryScreen };
