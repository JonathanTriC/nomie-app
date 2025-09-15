import { apiGet } from '@api';
import { URL_PATH } from '@constants';
import { useNavigate } from '@hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useMealsCategory = () => {
  const { getRouteParams } = useNavigate();
  const { type, query } = getRouteParams<MealsCategoryScreenParams>();

  const {
    data: dataMealsCategory,
    refetch: refetchMealsCategory,
    fetchNextPage: fetchNextPageCategory,
    hasNextPage: hasNextPageCategory,
    isFetchingNextPage: isFetchingNextPageCategory,
    isLoading: isLoadingCategory,
  } = useInfiniteQuery<SearchMealsData>({
    queryKey: ['meals-category', query],
    queryFn: async ({ pageParam }) => {
      const res = await apiGet({
        url: URL_PATH.meals.meals_category({
          query,
          limit: 10,
          page: Number(pageParam),
        }),
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: SearchMealsData) => {
      const nextPage =
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
      return nextPage;
    },

    enabled: false,
    retry: false,
  });

  const {
    data: dataMealsArea,
    refetch: refetchMealsArea,
    fetchNextPage: fetchNextPageArea,
    hasNextPage: hasNextPageArea,
    isFetchingNextPage: isFetchingNextPageArea,
    isLoading: isLoadingArea,
  } = useInfiniteQuery<SearchMealsData>({
    queryKey: ['meals-area', query],
    queryFn: async ({ pageParam }) => {
      const res = await apiGet({
        url: URL_PATH.meals.meals_area({
          query,
          limit: 10,
          page: Number(pageParam),
        }),
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: SearchMealsData) => {
      const nextPage =
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
      return nextPage;
    },

    enabled: false,
    retry: false,
  });

  const loadNextPageData = () => {
    if (type === 'category' && hasNextPageCategory) {
      fetchNextPageCategory();
    } else if (type === 'area' && hasNextPageArea) {
      fetchNextPageArea();
    }
  };

  const mealsCategory =
    dataMealsCategory?.pages.flatMap(page => page.meals) ?? [];
  const mealsArea = dataMealsArea?.pages.flatMap(page => page.meals) ?? [];
  const data = type === 'category' ? mealsCategory : mealsArea;
  const isLoading = type === 'category' ? isLoadingCategory : isLoadingArea;
  const isFetchingNextPage =
    type === 'category' ? isFetchingNextPageCategory : isFetchingNextPageArea;

  useEffect(() => {
    if (type === 'category') {
      refetchMealsCategory();
    } else {
      refetchMealsArea();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return {
    query,
    data,
    isLoading,
    isFetchingNextPage,
    loadNextPageData,
  };
};

export default useMealsCategory;
