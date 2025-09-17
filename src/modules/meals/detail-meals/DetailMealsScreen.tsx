import {
  ActivityIndicator,
  Animated,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import useDetailMealScreen from './useDetailMealScreen';
import FastImage from 'react-native-fast-image';
import { Colors, getYouTubeId } from '@constants';
import { styles } from './styles';
import { Icon } from 'react-native-paper';
import { BottomModal, Text } from '@components';
import YoutubePlayer from 'react-native-youtube-iframe';

const DetailMealsScreen: React.FC = () => {
  const {
    detailMeals,
    scrollY,
    headerBackgroundColor,
    iconColorAnimated,
    activeTabItem,
    activeBackgroundTranslateX,
    containerWidth,
    stepsArray,
    isLoadingDetailMeals,
    isShowModalVideo,
    toggleVideoModal,
    handleLayout,
    handleFavorite,
    animateSelection,
    popScreen,
  } = useDetailMealScreen();
  return (
    <View style={styles.screenWrapper}>
      {!isLoadingDetailMeals ? (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={16}
          >
            <FastImage
              source={{ uri: detailMeals?.mealThumbImage }}
              style={styles.mealImage}
              resizeMode="cover"
            />

            <View style={styles.mainContentContainer}>
              <View style={styles.rowBetween}>
                <View style={styles.gap6}>
                  <Text
                    text={detailMeals?.mealName}
                    type="bold-lg"
                    color={Colors.neutral.base}
                  />
                  <Text
                    text={`${detailMeals?.mealArea} - ${detailMeals?.mealCategory}`}
                    type="regular-base"
                    color={Colors.neutral.n300}
                  />
                </View>

                {(detailMeals?.avgRating ?? 0) > 0 ? (
                  <View style={styles.starRow}>
                    <Icon
                      source={'star'}
                      size={24}
                      color={Colors.warning.base}
                    />
                    <Text
                      text={`${detailMeals?.avgRating}`}
                      type="bold-lg"
                      style={styles.pv4}
                    />
                  </View>
                ) : null}
              </View>

              <View style={styles.tabItemContainer} onLayout={handleLayout}>
                <Animated.View
                  style={[
                    styles.tabItemItemActive,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      position: 'absolute',
                      top: 4,
                      left: 4,
                      right: 4,
                      bottom: 4,
                      transform: [{ translateX: activeBackgroundTranslateX }],
                      width: containerWidth / 2 - 8,
                    },
                  ]}
                />

                <TouchableOpacity
                  style={[styles.tabItemItem]}
                  onPress={() => animateSelection('ingredients')}
                >
                  <Text
                    style={[
                      styles.tabItemTxt,
                      activeTabItem === 'ingredients' &&
                        styles.tabItemTxtActive,
                    ]}
                    text="Ingredients"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tabItemItem]}
                  onPress={() => animateSelection('instructions')}
                >
                  <Text
                    style={[
                      styles.tabItemTxt,
                      activeTabItem === 'instructions' &&
                        styles.tabItemTxtActive,
                    ]}
                    text="Instructions"
                  />
                </TouchableOpacity>
              </View>

              {activeTabItem === 'ingredients' ? (
                <View style={styles.gap20}>
                  <Text text="What You Need" type="bold-lg" />

                  <FlatList
                    scrollEnabled={false}
                    data={detailMeals?.mealIngredient}
                    // eslint-disable-next-line react/no-unstable-nested-components, react-native/no-inline-styles
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 12 }} />
                    )}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.ingredientItemContainer}>
                          <FastImage
                            source={{ uri: item?.ingredientImage }}
                            style={styles.ingredientImage}
                          />
                          <Text
                            text={item?.ingredientName}
                            style={styles.flex1}
                          />
                          <Text text={item?.ingredientMeasure} />
                        </View>
                      );
                    }}
                  />
                </View>
              ) : (
                <View style={styles.gap20}>
                  <Text text="How to Cook" type="bold-lg" />

                  <FlatList
                    scrollEnabled={false}
                    data={stepsArray}
                    // eslint-disable-next-line react/no-unstable-nested-components, react-native/no-inline-styles
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 12 }} />
                    )}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.ingredientItemContainer}>
                          <Text text={item} style={styles.flex1} />
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </ScrollView>

          {detailMeals?.mealYoutubeTutorial ? (
            <View style={styles.playContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={toggleVideoModal}
              >
                <Text
                  text="Watch Video"
                  type="bold-base"
                  color={Colors.white}
                />
                <Icon source={'play-circle'} size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.headerContainer}>
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: headerBackgroundColor },
              ]}
            >
              <Animated.View>
                <View style={styles.headerPosition}>
                  <Animated.View
                    style={{
                      opacity: iconColorAnimated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                      }),
                    }}
                  >
                    <View style={styles.initRowHeader}>
                      <TouchableOpacity
                        style={styles.headerIconContainer}
                        onPress={() => popScreen()}
                      >
                        <Icon
                          source={'chevron-left'}
                          color={Colors.neutral.base}
                          size={24}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.headerIconContainer}
                        onPress={() => handleFavorite()}
                      >
                        <Icon
                          source={
                            !detailMeals?.isFavourite
                              ? 'favorite-border'
                              : 'favorite'
                          }
                          color={
                            !detailMeals?.isFavourite
                              ? Colors.neutral.base
                              : Colors.danger.base
                          }
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                  <Animated.View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      position: 'absolute',
                      top: 0,
                      opacity: iconColorAnimated,
                    }}
                  >
                    <View style={styles.rowHeader}>
                      <TouchableOpacity
                        style={styles.headerIconContainer}
                        onPress={() => popScreen()}
                      >
                        <Icon
                          source={'chevron-left'}
                          color={Colors.neutral.base}
                          size={24}
                        />
                      </TouchableOpacity>
                      <Text
                        text="Detail Meals"
                        type="bold-lg"
                        textAlign="center"
                        color={Colors.neutral.base}
                        style={styles.headerTxt}
                      />
                      <TouchableOpacity
                        style={styles.headerIconContainer}
                        onPress={() => handleFavorite()}
                      >
                        <Icon
                          source={
                            !detailMeals?.isFavourite
                              ? 'favorite-border'
                              : 'favorite'
                          }
                          color={
                            !detailMeals?.isFavourite
                              ? Colors.neutral.base
                              : Colors.danger.base
                          }
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </View>
              </Animated.View>
            </Animated.View>
          </View>
        </View>
      ) : (
        <ActivityIndicator color={Colors.neutral.disabled} />
      )}

      <BottomModal
        title="Watch Video"
        isVisible={isShowModalVideo}
        onPressClose={toggleVideoModal}
      >
        <View style={styles.gap20}>
          <Text
            text={`Video tutorial for ${detailMeals?.mealName}`}
            type="bold-base"
          />
          <YoutubePlayer
            height={220}
            videoId={getYouTubeId(detailMeals?.mealYoutubeTutorial)}
          />
        </View>
      </BottomModal>
    </View>
  );
};

export { DetailMealsScreen };
