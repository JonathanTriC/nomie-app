import { SkeletonLoading, Text, TextField } from '@components';
import { Colors, screenWidth } from '@constants';
import { FlatList, TouchableOpacity, View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { styles } from './styles';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-paper';
import useSearchScreen from './useSearchScreen';
import FastImage from 'react-native-fast-image';
import { Controller } from 'react-hook-form';
import EmptyState from '@assets/images/empty-state.png';
import { Image } from 'react-native';

const SearchScreen: React.FC = () => {
  const {
    control,
    categoryList,
    areaList,
    meals,
    isFetchingNextPage,
    isLoadingSearch,
    debouncedSearchTxt,
    expandedType,
    toggleAccordion,
    loadNextPageData,
  } = useSearchScreen();

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
    <View style={styles.screen}>
      <RadialGradient
        colors={[Colors.primary.base, Colors.neutral.n100]}
        stops={[0.2, 1]}
        center={[screenWidth / 2, 100]}
        radius={screenWidth * 0.8}
        style={styles.gradient}
      />
      <View style={styles.container}>
        <Controller
          control={control}
          name={'search'}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <TextField
              required
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              rightIcon={'search'}
              placeholder="What are you craving today?"
              returnKeyType="done"
              errorMessage={error?.message}
            />
          )}
        />

        {debouncedSearchTxt?.length < 1 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.gap20}>
              <View style={styles.gap8}>
                <View style={styles.rowBetween}>
                  <Text
                    text="Explore by Dish Type"
                    type="bold-lg"
                    color={Colors.neutral.base}
                  />
                  <TouchableOpacity onPress={() => toggleAccordion('category')}>
                    <Icon
                      source={
                        expandedType === 'category'
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  scrollEnabled={false}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={
                    expandedType === 'category'
                      ? categoryList
                      : categoryList?.slice(0, 6)
                  }
                  contentContainerStyle={styles.gap12}
                  columnWrapperStyle={[styles.spaceBetween, styles.gap8]}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity style={styles.cardItemContainer}>
                        <Text text={item} type="bold-base" />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={styles.gap8}>
                <View style={styles.rowBetween}>
                  <Text
                    text="Taste Around the World"
                    type="bold-lg"
                    color={Colors.neutral.base}
                  />
                  <TouchableOpacity onPress={() => toggleAccordion('area')}>
                    <Icon
                      source={
                        expandedType === 'area'
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  scrollEnabled={false}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  data={
                    expandedType === 'area' ? areaList : areaList?.slice(0, 6)
                  }
                  contentContainerStyle={styles.gap12}
                  columnWrapperStyle={[styles.spaceBetween, styles.gap8]}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity style={styles.cardItemContainer}>
                        <FastImage
                          source={{ uri: item?.imageUrl }}
                          style={styles.itemImg}
                        />
                        <Text text={item?.name} type="bold-base" />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View style={styles.height180} />
          </ScrollView>
        ) : (
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={meals}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={[styles.gap12, { paddingBottom: 240 }]}
              renderItem={({ item }) => renderSearchItem(item)}
              keyExtractor={item => item.mealId}
              ListEmptyComponent={() =>
                isLoadingSearch ? renderLoadingSearch() : renderEmpty()
              }
              onEndReached={loadNextPageData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingNextPage ? renderLoadingSearch() : null
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export { SearchScreen };
