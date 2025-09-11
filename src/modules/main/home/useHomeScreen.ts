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
        },
        {
          queryKey: ['popular-picks'],
          queryFn: () =>
            apiGet({
              url: `${URL_PATH.meals.popular_picks({ limit: 8, page: 1 })}`,
            }).then((res: PopularPicksData) => res),
          placeholderData: keepPreviousData,
        },
        {
          queryKey: ['cuisine-picks'],
          queryFn: () =>
            apiGet({
              url: `${URL_PATH.meals.cuisine_picks({ limit: 8, page: 1 })}`,
            }).then((res: CuisinePicksData) => res),
          placeholderData: keepPreviousData,
        },
      ],
    });

  const { data: todayRecommendation, isLoading: isLoadingTodayRecommendation } =
    todayRecommendationQueries;
  const { data: popularPicks, isLoading: isLoadingPopularPicks } =
    popularPicksQueries;
  const { data: cuisinePicks, isLoading: isLoadingCuisinePicks } =
    cuisinePicksQueries;

  return {
    userProfile,
    todayRecommendation,
    isLoadingTodayRecommendation,
    popularPicks,
    isLoadingPopularPicks,
    cuisinePicks,
    isLoadingCuisinePicks,
  };
};

export default useHomeScreen;
