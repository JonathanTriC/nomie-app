import { apiGet } from '@api';
import { URL_PATH } from '@constants';
import { useUserStore } from '@stores';
import { keepPreviousData, useQueries } from '@tanstack/react-query';

const useHomeScreen = () => {
  const userProfile = useUserStore(state => state.userProfile);

  const [todayRecommendationQueries, popularPicksQueries, cuisinePicksQueries] =
    useQueries({
      queries: [
        {
          queryKey: ['today-recommendation'],
          queryFn: () =>
            apiGet({
              url: `${URL_PATH.meals.today_recommendation}`,
            }).then((res: MealsData) => res?.meals?.[0]),
          placeholderData: keepPreviousData,
          retry: false,
        },
        {
          queryKey: ['popular-picks'],
          queryFn: () =>
            apiGet({
              url: `${URL_PATH.meals.popular_picks({ limit: 8, page: 1 })}`,
            }).then((res: PopularPicksData) => res),
          placeholderData: keepPreviousData,
          retry: false,
        },
        {
          queryKey: ['cuisine-picks'],
          queryFn: () =>
            apiGet({
              url: `${URL_PATH.meals.cuisine_picks({ limit: 8, page: 1 })}`,
            }).then((res: CuisinePicksData) => res),
          placeholderData: keepPreviousData,
          retry: false,
        },
      ],
    });

  const {
    data: todayRecommendation,
    isLoading: isLoadingTodayRecommendation,
    isError: isErrorTodayRecommendation,
  } = todayRecommendationQueries;
  const {
    data: popularPicks,
    isLoading: isLoadingPopularPicks,
    isError: isErrorPopularPicks,
  } = popularPicksQueries;
  const {
    data: cuisinePicks,
    isLoading: isLoadingCuisinePicks,
    isError: isErrorCuisinePicks,
  } = cuisinePicksQueries;

  return {
    userProfile,
    todayRecommendation,
    isLoadingTodayRecommendation,
    isErrorTodayRecommendation,
    popularPicks,
    isLoadingPopularPicks,
    isErrorPopularPicks,
    cuisinePicks,
    isLoadingCuisinePicks,
    isErrorCuisinePicks,
  };
};

export default useHomeScreen;
