import { apiDelete, apiGet, apiPost } from '@api';
import { URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Platform } from 'react-native';

type TabItem = 'ingredients' | 'instructions';

const useDetailMealScreen = () => {
  const { getRouteParams, popScreen } = useNavigate();
  const { mealId } = getRouteParams<DetailMealsScreenParams>();

  const [containerWidth, setContainerWidth] = useState(0);
  const [activeTabItem, setActiveTabItem] = useState<TabItem>('ingredients');
  const [scrollY] = useState(new Animated.Value(0));
  const [isShowModalVideo, setIsShowModalVideo] = useState<boolean>(false);

  const activeBackgroundPosition = useRef(new Animated.Value(0)).current;
  const queryClient = useQueryClient();

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const animateSelection = (type: TabItem) => {
    Animated.timing(activeBackgroundPosition, {
      toValue: type === 'instructions' ? 1 : 0,
      duration: 300,
      useNativeDriver: Platform.OS === 'android',
    }).start();

    setActiveTabItem(type);
  };

  const activeBackgroundTranslateX = activeBackgroundPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth / 2 - 4],
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    extrapolate: 'clamp',
  });

  const iconColorAnimated = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const toggleVideoModal = useCallback(
    () => setIsShowModalVideo(prevState => !prevState),
    [],
  );

  const { data: detailMeals, isLoading: isLoadingDetailMeals } =
    useQuery<DetailMealsData>({
      queryKey: ['detail-meals', mealId],
      queryFn: async () => {
        const data = await apiGet({
          url: `${URL_PATH.meals.detail_meals({ mealId })}`,
        });

        return data;
      },
    });

  const addFavoriteMutation = useMutation({
    mutationFn: () =>
      apiPost({
        url: `${URL_PATH.meals.favourites}`,
        body: {
          mealId: detailMeals?.mealId,
          mealName: detailMeals?.mealName,
          mealThumbImage: detailMeals?.mealThumbImage,
        },
      }),
    // 2. On success, invalidate the query to trigger a refetch automatically
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detail-meals', mealId] });
    },
  });

  // 3. Create a mutation for removing a favorite
  const removeFavoriteMutation = useMutation({
    mutationFn: () =>
      apiDelete({
        url: `${URL_PATH.meals.favourites}/${detailMeals?.mealId}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detail-meals', mealId] });
    },
  });

  const handleFavorite = () => {
    if (detailMeals?.isFavourite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const formattedInstructions = detailMeals?.mealInstructions
    .trim()
    .replace(/^(\d+)\s+/gm, '$1. ');
  const stepsArray = formattedInstructions?.split(/\n\s*\n/);

  return {
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
  };
};

export default useDetailMealScreen;
