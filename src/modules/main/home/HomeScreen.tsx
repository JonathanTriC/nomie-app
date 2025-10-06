import { SkeletonLoading, Text } from '@components';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import useHomeScreen from './useHomeScreen';
import { styles } from './styles';
import { Colors, screenWidth } from '@constants';
import { Icon } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

interface RenderHomeItemProps<T extends any[]> {
  type: 'category' | 'area' | 'last-seen';
  query: string;
  isLoading: boolean;
  isError: boolean;
  label: string;
  data: T | undefined;
}

const HomeScreen: React.FC = () => {
  const {
    userProfile,
    lastSeenMeals,
    isLoadingLastSeenMeals,
    isErrorLastSeenMeals,
    todayRecommendation,
    isLoadingTodayRecommendation,
    popularPicks,
    isLoadingPopularPicks,
    isErrorPopularPicks,
    cuisinePicks,
    isLoadingCuisinePicks,
    isErrorCuisinePicks,
    clearLastSeenMealsMutation,
    goToDetailScreen,
    onSearchByCategory,
  } = useHomeScreen();

  const cardsItem = (item: PopularPicksItem) => {
    return (
      <TouchableOpacity
        key={item?.mealId}
        style={styles.mealCards}
        onPress={() => goToDetailScreen(item?.mealId)}
      >
        <FastImage
          source={{ uri: item?.mealThumbImage }}
          style={styles.mealImg}
          resizeMode="cover"
        />

        <View style={[styles.favoriteIcon, styles.favoriteIconPosition]}>
          <Icon
            source={!item?.isFavourite ? 'favorite-border' : 'favorite'}
            color={
              !item?.isFavourite ? Colors.neutral.base : Colors.danger.base
            }
            size={18}
          />
        </View>
        <Text
          text={item?.mealName}
          type="regular-base"
          color={Colors.neutral.base}
          numberOfLines={2}
        />
      </TouchableOpacity>
    );
  };

  const renderHorizontalSkeleton = () => {
    return (
      <View style={styles.horizontalSkeleton}>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonLoading
            key={index}
            height={172}
            width={154}
            borderRadius={12}
          />
        ))}
      </View>
    );
  };

  const renderHomeItemComponent = <T extends any[]>({
    type,
    query,
    isLoading,
    isError,
    label,
    data,
  }: RenderHomeItemProps<T>) => {
    if (isLoading) {
      return renderHorizontalSkeleton();
    }
    if (isError || data?.length === undefined) {
      return null;
    }

    return (
      <View style={styles.gap8}>
        <View style={styles.rowBetween}>
          <Text text={label} type="bold-lg" color={Colors.neutral.base} />
          {type !== 'last-seen' ? (
            <TouchableOpacity
              onPress={() =>
                onSearchByCategory({
                  type,
                  query,
                })
              }
            >
              <Icon source={'chevron-right'} size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => clearLastSeenMealsMutation.mutate()}
            >
              <Text
                text="Clear"
                type="regular-base"
                color={Colors.danger.base}
              />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={styles.gap12}
          renderItem={({ item }) => cardsItem(item)}
        />
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.rowBetween}>
        <View style={styles.gap6}>
          <Text
            text={`Hello ${userProfile?.fullname},`}
            type="regular-base"
            color={Colors.neutral.n300}
          />
          <Text
            text="What you want to eat today?"
            type="bold-xl"
            color={Colors.neutral.base}
            style={styles.titleContainer}
          />
        </View>

        <FastImage
          source={{ uri: userProfile?.avatar }}
          style={styles.avatarImg}
        />
      </View>

      {isLoadingTodayRecommendation ? (
        <SkeletonLoading height={280} borderRadius={12} />
      ) : (
        <View style={styles.gap8}>
          <Text
            text="Chef’s Pick of the Day"
            type="bold-lg"
            color={Colors.neutral.base}
          />
          <TouchableOpacity
            style={styles.todayRecommendationCards}
            onPress={() => goToDetailScreen(todayRecommendation?.mealId ?? '')}
          >
            <FastImage
              source={{ uri: todayRecommendation?.mealThumbImage }}
              style={styles.todayRecommendationImg}
              resizeMode="cover"
            />
            <View style={styles.todayRecommendationDetail}>
              <View style={[styles.gap6, { width: screenWidth - 120 }]}>
                <Text
                  text={todayRecommendation?.mealName}
                  type="bold-lg"
                  color={Colors.neutral.base}
                  numberOfLines={1}
                />
                <Text
                  text={`${todayRecommendation?.mealArea} - ${todayRecommendation?.mealCategory}`}
                  type="regular-base"
                  color={Colors.neutral.n300}
                />
              </View>

              <View style={styles.favoriteIcon}>
                <Icon
                  source={
                    !todayRecommendation?.isFavourite
                      ? 'favorite-border'
                      : 'favorite'
                  }
                  color={
                    !todayRecommendation?.isFavourite
                      ? Colors.neutral.base
                      : Colors.danger.base
                  }
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {renderHomeItemComponent({
        type: 'last-seen',
        query: popularPicks?.categoryName ?? '',
        isLoading: isLoadingLastSeenMeals,
        isError: isErrorLastSeenMeals,
        label: `Back for Another Bite?`,
        data: lastSeenMeals?.meals,
      })}

      {renderHomeItemComponent({
        type: 'category',
        query: popularPicks?.categoryName ?? '',
        isLoading: isLoadingPopularPicks,
        isError: isErrorPopularPicks,
        label: `Tasty ${popularPicks?.categoryName} Dishes Everyone Loves`,
        data: popularPicks?.meals,
      })}

      {renderHomeItemComponent({
        type: 'area',
        query: cuisinePicks?.areaName?.name ?? '',
        isLoading: isLoadingCuisinePicks,
        isError: isErrorCuisinePicks,
        label: `Straight from ${cuisinePicks?.areaName?.name} Kitchen`,
        data: cuisinePicks?.meals,
      })}

      <View style={styles.height50} />
    </ScrollView>
  );
};

export { HomeScreen };
