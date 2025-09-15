import { SkeletonLoading, Text } from '@components';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import useHomeScreen from './useHomeScreen';
import { styles } from './styles';
import { Colors, screenWidth } from '@constants';
import { Icon } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

interface RenderHomeItemProps<T extends any[]> {
  isLoading: boolean;
  isError: boolean;
  label: string;
  data: T | undefined;
}

const HomeScreen: React.FC = () => {
  const {
    userProfile,
    todayRecommendation,
    isLoadingTodayRecommendation,
    popularPicks,
    isLoadingPopularPicks,
    isErrorPopularPicks,
    cuisinePicks,
    isLoadingCuisinePicks,
    isErrorCuisinePicks,
  } = useHomeScreen();

  const cardsItem = (item: PopularPicksItem) => {
    return (
      <View key={item?.mealId} style={styles.mealCards}>
        <FastImage
          source={{ uri: item?.mealThumbImage }}
          style={styles.mealImg}
          resizeMode="cover"
        />
        <View style={[styles.favoriteIcon, styles.favoriteIconPosition]}>
          <Icon source={'favorite-border'} size={18} />
        </View>
        <Text
          text={item?.mealName}
          type="regular-base"
          color={Colors.neutral.base}
          numberOfLines={2}
        />
      </View>
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
    isLoading,
    isError,
    label,
    data,
  }: RenderHomeItemProps<T>) => {
    if (isLoading) {
      return renderHorizontalSkeleton();
    }
    if (isError) {
      return null;
    }
    return (
      <View style={styles.gap8}>
        <View style={styles.rowBetween}>
          <Text text={label} type="bold-lg" color={Colors.neutral.base} />
          <TouchableOpacity>
            <Icon source={'chevron-right'} size={20} />
          </TouchableOpacity>
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
          <View style={styles.todayRecommendationCards}>
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
                <Icon source={'favorite-border'} size={18} />
              </View>
            </View>
          </View>
        </View>
      )}

      {renderHomeItemComponent({
        isLoading: isLoadingPopularPicks,
        isError: isErrorPopularPicks,
        label: `Tasty ${popularPicks?.categoryName} Dishes Everyone Loves`,
        data: popularPicks?.meals,
      })}

      {renderHomeItemComponent({
        isLoading: isLoadingCuisinePicks,
        isError: isErrorCuisinePicks,
        label: `Straight from ${cuisinePicks?.areaName} Kitchen`,
        data: cuisinePicks?.meals,
      })}

      <View style={styles.height50} />
    </ScrollView>
  );
};

export { HomeScreen };
