import { apiDelete, apiGet } from '@api';
import { URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useUserStore } from '@stores';
import {
  keepPreviousData,
  useMutation,
  useQueries,
} from '@tanstack/react-query';
import { useCallback } from 'react';

const useHomeScreen = () => {
  const { navigateScreen } = useNavigate();
  const userProfile = useUserStore(state => state.userProfile);

  const [
    lastSeenMealsQueries,
    todayRecommendationQueries,
    popularPicksQueries,
    cuisinePicksQueries,
  ] = useQueries({
    queries: [
      {
        queryKey: ['last-seen'],
        queryFn: () =>
          apiGet({
            url: `${URL_PATH.meals.last_seen({ limit: 8, page: 1 })}`,
          }).then((res: LastSeenMealsData) => res),
        placeholderData: keepPreviousData,
        enabled: false,
        retry: false,
      },
      {
        queryKey: ['today-recommendation'],
        queryFn: () =>
          apiGet({
            url: `${URL_PATH.meals.today_recommendation}`,
          }).then((res: MealsData) => res?.meals?.[0]),
        placeholderData: keepPreviousData,
        enabled: false,
        retry: false,
      },
      {
        queryKey: ['popular-picks'],
        queryFn: () =>
          apiGet({
            url: `${URL_PATH.meals.popular_picks({ limit: 8, page: 1 })}`,
          }).then((res: PopularPicksData) => res),
        placeholderData: keepPreviousData,
        enabled: false,
        retry: false,
      },
      {
        queryKey: ['cuisine-picks'],
        queryFn: () =>
          apiGet({
            url: `${URL_PATH.meals.cuisine_picks({ limit: 8, page: 1 })}`,
          }).then((res: CuisinePicksData) => res),
        placeholderData: keepPreviousData,
        enabled: false,
        retry: false,
      },
    ],
  });

  const clearLastSeenMealsMutation = useMutation({
    mutationFn: () =>
      apiDelete({
        url: `${URL_PATH.meals.last_seen({})}`,
      }),
    onSuccess: () => {
      refetchLastSeenMeals();
    },
  });

  const goToDetailScreen = useCallback(
    (mealId: string) => {
      navigateScreen<DetailMealsScreenParams>('DetailMealsScreen', {
        mealId,
      });
    },
    [navigateScreen],
  );

  const onSearchByCategory = ({
    type,
    query,
  }: {
    type: 'category' | 'area';
    query: string;
  }) => {
    return navigateScreen<MealsCategoryScreenParams>('MealsCategoryScreen', {
      type,
      query,
    });
  };

  const {
    data: lastSeenMeals,
    isLoading: isLoadingLastSeenMeals,
    isError: isErrorLastSeenMeals,
    refetch: refetchLastSeenMeals,
  } = lastSeenMealsQueries;
  const {
    data: todayRecommendation,
    isLoading: isLoadingTodayRecommendation,
    isError: isErrorTodayRecommendation,
    refetch: refetchTodayRecommendation,
  } = todayRecommendationQueries;
  const {
    data: popularPicks,
    isLoading: isLoadingPopularPicks,
    isError: isErrorPopularPicks,
    refetch: refetchPopularPicks,
  } = popularPicksQueries;
  const {
    data: cuisinePicks,
    isLoading: isLoadingCuisinePicks,
    isError: isErrorCuisinePicks,
    refetch: refetchCuisinePicks,
  } = cuisinePicksQueries;

  useFocusEffect(
    useCallback(() => {
      refetchLastSeenMeals();
      refetchTodayRecommendation();
      refetchPopularPicks();
      refetchCuisinePicks();

      return () => {};
    }, [
      refetchLastSeenMeals,
      refetchCuisinePicks,
      refetchPopularPicks,
      refetchTodayRecommendation,
    ]),
  );

  return {
    userProfile,
    lastSeenMeals,
    isLoadingLastSeenMeals,
    isErrorLastSeenMeals,
    todayRecommendation,
    isLoadingTodayRecommendation,
    isErrorTodayRecommendation,
    popularPicks,
    isLoadingPopularPicks,
    isErrorPopularPicks,
    cuisinePicks,
    isLoadingCuisinePicks,
    isErrorCuisinePicks,
    clearLastSeenMealsMutation,
    goToDetailScreen,
    onSearchByCategory,
  };
};

export default useHomeScreen;
