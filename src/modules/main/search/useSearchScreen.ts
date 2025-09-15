import { apiGet } from '@api';
import { URL_PATH } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@hooks';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
} from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const formSchema = yup.object({
  search: yup.string().optional().default(''),
});

type FormData = yup.InferType<typeof formSchema>;

const useSearchScreen = () => {
  const { navigateScreen } = useNavigate();
  const [expandedType, setExpandedType] = useState<string | null>(null);

  const toggleAccordion = useCallback((type: string) => {
    setExpandedType(prevType => (prevType === type ? null : type));
  }, []);

  const { control, watch } = useForm<FormData>({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(formSchema),
  });

  const searchTxt = watch('search');

  const [debouncedSearchTxt, setDebouncedSearchTxt] = useState(searchTxt);

  const [categoryListQueries, areaListQueries] = useQueries({
    queries: [
      {
        queryKey: ['category-list'],
        queryFn: () =>
          apiGet({
            url: `${URL_PATH.misc.category}`,
          }).then((res: CategoryList) => res?.categories),
        placeholderData: keepPreviousData,
        retry: false,
      },
      {
        queryKey: ['area-list'],
        queryFn: () =>
          apiGet({
            url: `${URL_PATH.misc.area}`,
          }).then((res: AreaList) => res?.areas),
        placeholderData: keepPreviousData,
        retry: false,
      },
    ],
  });

  const {
    data: dataSearchMeals,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingSearch,
  } = useInfiniteQuery<SearchMealsData>({
    queryKey: ['search-meals', debouncedSearchTxt],
    queryFn: async ({ pageParam }) => {
      const res = await apiGet({
        url: URL_PATH.meals.search_meals({
          query: debouncedSearchTxt ?? '',
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
    enabled: debouncedSearchTxt?.length > 1,
    retry: false,
  });

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

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

  const { data: categoryList, isLoading: isLoadingCategoryList } =
    categoryListQueries;
  const { data: areaList, isLoading: isLoadingAreaList } = areaListQueries;
  const meals = dataSearchMeals?.pages.flatMap(page => page.meals) ?? [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTxt(searchTxt);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTxt]);

  return {
    categoryList,
    isLoadingCategoryList,
    areaList,
    isLoadingAreaList,
    dataSearchMeals,
    meals,
    hasNextPage,
    isFetchingNextPage,
    isLoadingSearch,
    debouncedSearchTxt,
    expandedType,
    control,
    toggleAccordion,
    fetchNextPage,
    loadNextPageData,
    onSearchByCategory,
  };
};

export default useSearchScreen;
